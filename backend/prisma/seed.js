import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@datavision.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@datavision.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin criado:', admin.email);

  // Criar clientes de exemplo
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '11987654321',
        userId: admin.id,
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Maria Santos',
        email: 'maria@email.com',
        phone: '21987654321',
        userId: admin.id,
      },
    }),
  ]);

  console.log('✅ Clientes criados:', customers.length);

  // Criar transações de exemplo
  for (const customer of customers) {
    await prisma.transaction.createMany({
      data: [
        {
          amount: 150.50,
          status: 'completed',
          type: 'credit_card',
          customerId: customer.id,
        },
        {
          amount: 250.00,
          status: 'pending',
          type: 'pix',
          customerId: customer.id,
        },
      ],
    });
  }

  console.log('✅ Transações criadas');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });