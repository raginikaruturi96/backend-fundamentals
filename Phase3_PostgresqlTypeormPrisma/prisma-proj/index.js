const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {name, email},
    });
    res.status(201).json(user);
    } catch (error) { 
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found'});
    }
    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    try{
        const id = Number(req.params.id);
        const { name, email } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.user.delete({ 
            where: { id },
        });
        res.json({ message: 'User deleted successfully' });
    }catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});