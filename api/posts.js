import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let isConnected = false;

export default async function handle(req, res) {
    try {
        if (!isConnected) {
            await client.connect();
            isConnected = true;
        }

        const db = client.db("recipesDB");
        const collection = db.collection("recipes");

        if (req.method === 'POST') {
            const { recipe } = req.body

            if (
                !recipe ||
                typeof recipe.title !== 'string' || recipe.title.trim() === '' || 
                !Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0 ||
                typeof recipe.instructions !== 'string' || recipe.instructions.trim() === '' || 
                typeof recipe.time !== 'string' || recipe.time.trim() === '' ||
                typeof recipe.servings !== 'number' || recipe.servings <= 0 ||
                (recipe.photo && typeof recipe.photo !== 'string') ||
                typeof recipe.category !== 'string' || recipe.category.trim() === ''
            ) {
                return res.status(400).json({ error: 'Invalid recipe data' });
            }

            const result = await collection.insertOne(recipe);
            res.status(200).json({ message: 'Success', id: result.insertedId })
        } else if (req.method === 'GET') {
            const allRecipes = await collection.find().toArray();
            return res.status(200).json(allRecipes)
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Server error' });
    }
};



