import { jwtDecode } from "jwt-decode";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDE0NzE2YTA5YWQxMjlhYTY4ZGVmOSIsImVtYWlsIjoibGV0cmFudGh1YW5waGF0MTExQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzEyMDMwMSwiZXhwIjoxNzMzMTIzOTAxfQ.2CNvAPryoy_XLl1Bizj1W4s2Yauqqr847-B7f3Mkgew";

const decoded = jwtDecode(token);
console.log(decoded);
