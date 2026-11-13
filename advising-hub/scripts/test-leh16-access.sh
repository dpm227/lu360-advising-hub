#!/usr/bin/env bash
set -euo pipefail

DB_CONTAINER="lu360-advising-hub-postgres"
BASE_URL="http://localhost:3000"
PREFIX="leh16-access-test"

cleanup() {
  echo
  echo "========== CLEANING UP TEST DATA =========="

  docker exec -i "$DB_CONTAINER" \
    psql -v ON_ERROR_STOP=1 -U lu360 -d lu360_advising_hub <<SQL
BEGIN;

DELETE FROM "Session"
WHERE "id" LIKE '${PREFIX}%';

DELETE FROM "Student"
WHERE "id" LIKE '${PREFIX}%';

DELETE FROM "Advisor"
WHERE "id" LIKE '${PREFIX}%';

DELETE FROM "User"
WHERE "id" LIKE '${PREFIX}%';

DELETE FROM "Organization"
WHERE "id" LIKE '${PREFIX}%';

COMMIT;
SQL
}

trap cleanup EXIT

echo "========== PREPARING TEST DATA =========="

# Remove any fixtures left by an interrupted previous run.
cleanup

docker exec -i "$DB_CONTAINER" \
  psql -v ON_ERROR_STOP=1 -U lu360 -d lu360_advising_hub <<SQL
BEGIN;

INSERT INTO "Organization"
  ("id", "name", "domain", "orgSlug", "updatedAt")
VALUES
  ('${PREFIX}-org-a', 'LEH16 Test Organization A',
   'leh16-test-a.invalid', 'leh16-test-a', NOW()),
  ('${PREFIX}-org-b', 'LEH16 Test Organization B',
   'leh16-test-b.invalid', 'leh16-test-b', NOW());

INSERT INTO "User"
  ("id", "email", "role", "updatedAt")
VALUES
  ('${PREFIX}-advisor-user', 'leh16-advisor@example.invalid',
   'ADVISOR', NOW()),
  ('${PREFIX}-admin-user', 'leh16-admin@example.invalid',
   'ADMIN', NOW()),
  ('${PREFIX}-student-user', 'leh16-student@example.invalid',
   'STUDENT', NOW()),
  ('${PREFIX}-student-a-user', 'leh16-student-a@example.invalid',
   'STUDENT', NOW()),
  ('${PREFIX}-student-b-user', 'leh16-student-b@example.invalid',
   'STUDENT', NOW());

INSERT INTO "Advisor"
  ("id", "userId", "organizationId", "email", "updatedAt")
VALUES
  ('${PREFIX}-advisor',
   '${PREFIX}-advisor-user',
   '${PREFIX}-org-a',
   'leh16-advisor@example.invalid',
   NOW());

INSERT INTO "Student"
  ("id", "userId", "organizationId", "email", "updatedAt")
VALUES
  ('${PREFIX}-student-a',
   '${PREFIX}-student-a-user',
   '${PREFIX}-org-a',
   'leh16-student-a@example.invalid',
   NOW()),
  ('${PREFIX}-student-b',
   '${PREFIX}-student-b-user',
   '${PREFIX}-org-b',
   'leh16-student-b@example.invalid',
   NOW());

INSERT INTO "Session"
  ("id", "sessionToken", "userId", "expires")
VALUES
  ('${PREFIX}-advisor-session',
   '${PREFIX}-advisor-token',
   '${PREFIX}-advisor-user',
   NOW() + INTERVAL '1 hour'),
  ('${PREFIX}-admin-session',
   '${PREFIX}-admin-token',
   '${PREFIX}-admin-user',
   NOW() + INTERVAL '1 hour'),
  ('${PREFIX}-student-session',
   '${PREFIX}-student-token',
   '${PREFIX}-student-user',
   NOW() + INTERVAL '1 hour'),
  ('${PREFIX}-expired-session',
   '${PREFIX}-expired-token',
   '${PREFIX}-advisor-user',
   NOW() - INTERVAL '1 hour');

COMMIT;
SQL

PASS=0
FAIL=0

check_status() {
  local description="$1"
  local expected="$2"
  local token="$3"
  local path="$4"
  local actual

  actual=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Cookie: next-auth.session-token=${token}" \
    "${BASE_URL}${path}")

  if [ "$actual" = "$expected" ]; then
    echo "PASS: ${description} (HTTP ${actual})"
    PASS=$((PASS + 1))
  else
    echo "FAIL: ${description} (expected ${expected}, got ${actual})"
    FAIL=$((FAIL + 1))
  fi
}

echo
echo "========== RUNNING AUTHORIZATION TESTS =========="

check_status \
  "Advisor accesses same-organization student" \
  204 \
  "${PREFIX}-advisor-token" \
  "/api/advisor/students/${PREFIX}-student-a/access"

check_status \
  "Advisor denied cross-organization student" \
  403 \
  "${PREFIX}-advisor-token" \
  "/api/advisor/students/${PREFIX}-student-b/access"

check_status \
  "Advisor denied nonexistent student" \
  403 \
  "${PREFIX}-advisor-token" \
  "/api/advisor/students/nonexistent-leh16-student/access"

check_status \
  "Admin accesses student in organization A" \
  204 \
  "${PREFIX}-admin-token" \
  "/api/advisor/students/${PREFIX}-student-a/access"

check_status \
  "Admin accesses student in organization B" \
  204 \
  "${PREFIX}-admin-token" \
  "/api/advisor/students/${PREFIX}-student-b/access"

check_status \
  "Student denied advisor API access" \
  401 \
  "${PREFIX}-student-token" \
  "/api/advisor/students/${PREFIX}-student-a/access"

check_status \
  "Student redirected from advisor page" \
  307 \
  "${PREFIX}-student-token" \
  "/advisor"

check_status \
  "Expired advisor session denied API access" \
  401 \
  "${PREFIX}-expired-token" \
  "/api/advisor/students/${PREFIX}-student-a/access"

check_status \
  "Expired advisor session redirected from page" \
  307 \
  "${PREFIX}-expired-token" \
  "/advisor"

echo
echo "========== RESULTS =========="
echo "Passed: ${PASS}"
echo "Failed: ${FAIL}"

if [ "$FAIL" -ne 0 ]; then
  exit 1
fi

echo "ALL LEH-16 ACCESS TESTS PASSED"
