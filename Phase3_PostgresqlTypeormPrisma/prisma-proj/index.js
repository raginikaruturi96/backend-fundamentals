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

app.post('/users-with-profile', async (req, res) => {
  const { name, email, bio } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        profile: {
          create: { bio },
        },
      },
      include: { profile: true },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user with profile' });
  }
});

app.post('/users/:userId/posts', async (req, res) => {
  const userId = Number(req.params.userId);
  const { title, content } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.post('/groups', async (req, res) => {
  const { name } = req.body;
  try {
    const group = await prisma.group.create({
      data: { name },
    });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
});

app.post('/users/:userId/groups/:groupId', async (req, res) => {
  const userId = Number(req.params.userId);
  const groupId = Number(req.params.groupId);
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        groups: {
          connect: { id: groupId },
        },
      },
      include: { groups: true },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user to group' });
  }
});

app.get('/groups', async (req, res) => {
  try {
    const groups = await prisma.group.findMany({
      include: { users: true },
    });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

app.get('/users/:id/full', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        posts: true,
        groups: true,
      },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user with relations' });
  }
});
