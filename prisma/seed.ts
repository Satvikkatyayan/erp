import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create default Currency
  const usd = await prisma.currency.upsert({
    where: { code: 'USD' },
    update: {},
    create: { code: 'USD', name: 'US Dollar', symbol: '$' },
  })

  // Create default Country
  const usa = await prisma.country.upsert({
    where: { code: 'US' },
    update: {},
    create: { code: 'US', name: 'United States' },
  })

  // Create default Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Default Organization',
      domain: 'example.com',
      currencyId: usd.id,
    }
  })

  // Create default City
  const newYork = await prisma.city.create({
    data: {
      name: 'New York',
      state: {
        create: {
          code: 'NY',
          name: 'New York',
          countryId: usa.id,
        }
      }
    }
  })

  // Create default Branch
  const branch = await prisma.branch.create({
    data: {
      name: 'Headquarters',
      organizationId: org.id,
      cityId: newYork.id,
    }
  })

  // Create default Department
  const dept = await prisma.department.create({
    data: {
      name: 'Management',
      code: 'MGMT',
      organizationId: org.id,
    }
  })

  // Create initial Admin Role
  const adminRole = await prisma.role.upsert({
    where: { name: 'System Administrator' },
    update: {},
    create: { name: 'System Administrator', description: 'Full access to all modules' },
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
