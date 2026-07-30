const fs = require('fs');

let c = fs.readFileSync('prisma/schema.prisma', 'utf8');
c = c.replace(/\\n/g, '\n');
c = c.replace(/\bEmployee\b/g, 'EmpEmployee');
c = c.replace(/\bDepartmentTransfer\b/g, 'EmpJobAssignment');
c = c.replace(/\bAddress\[\]\b/g, 'Json?');

fs.writeFileSync('prisma/schema.prisma', c);
console.log('Fixed Prisma references.');
