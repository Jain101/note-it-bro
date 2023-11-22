import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors)
const port = process.env.PORT

// Define routes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/notes/search', async (req, res) => {
    const searchTerm = req.query.term;
    try {
        const notes = await Note.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
            ],
        });
        res.json(notes);
    } catch (error) {
        console.error('Error searching notes', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

app.route('/book')
    .get((req, res) => {
        res.send('Get a random book')
    })
    .post((req, res) => {
        res.send('Add a book')
    })
    .put((req, res) => {
        res.send('Update the book')
    })