import express from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/user";
import { Profile } from "./entity/profile";
import { Post } from "./entity/post";
import { Group } from "./entity/groups";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized");

        // Get all users
        app.get("/users", async (req, res) => {
            try {
                const users = await AppDataSource.manager.find(User, {
                    relations: ["profile", "posts", "groups"],
                });
                res.json(users);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to fetch users", error });
            }
        });

        // Get user by ID with all relations
        app.get("/users/:userId", async (req, res) => {
            try {
                const userRepo = AppDataSource.getRepository(User);
                const user = await userRepo.findOne({
                    where: { id: Number(req.params.userId) },
                    relations: ["profile", "posts", "groups"],
                });
                if (!user) return res.status(404).json({ message: "User not found" });
                res.json(user);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to fetch user", error });
            }
        });

        // Create a post for a user
        app.post("/users/:userId/posts", async (req, res) => {
            try {
                const postRepo = AppDataSource.getRepository(Post);
                const userRepo = AppDataSource.getRepository(User);
                const user = await userRepo.findOneBy({ id: Number(req.params.userId) });
                if (!user) return res.status(404).json({ message: "User not found" });

                const post = postRepo.create({
                    title: req.body.title,
                    content: req.body.content,
                    user: user,
                });
                const saved = await postRepo.save(post);
                res.status(201).json(saved);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to create post", error });
            }
        });

        // Get all posts
        app.get("/posts", async (req, res) => {
            try {
                const posts = await AppDataSource.manager.find(Post, {
                    relations: ["user"],
                });
                res.json(posts);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to fetch posts", error });
            }
        });

        // Create a new group
        app.post("/groups", async (req, res) => {
            try {
                const groupRepo = AppDataSource.getRepository(Group);
                const group = groupRepo.create({
                    name: req.body.name,
                });
                const saved = await groupRepo.save(group);
                res.status(201).json(saved);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to create group", error });
            }
        });

        // Get all groups
        app.get("/groups", async (req, res) => {
            try {
                const groups = await AppDataSource.manager.find(Group, {
                    relations: ["users"],
                });
                res.json(groups);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to fetch groups", error });
            }
        });

        // Add a user to a group
        app.post("/groups/:groupId/add-user", async (req, res) => {
            try {
                const groupRepo = AppDataSource.getRepository(Group);
                const userRepo = AppDataSource.getRepository(User);
                const group = await groupRepo.findOne({
                    where: { id: Number(req.params.groupId) },
                    relations: ["users"],
                });
                if (!group) return res.status(404).json({ message: "Group not found" });

                const user = await userRepo.findOneBy({ id: req.body.userId });
                if (!user) return res.status(404).json({ message: "User not found" });

                group.users = [...(group.users || []), user];
                await groupRepo.save(group);
                res.status(200).json(group);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to add user to group", error });
            }
        });

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch((err: any) => {
        console.error("Error initializing data source:", err);
    });