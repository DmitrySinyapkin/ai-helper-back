import app from '../src/app';

const BASE_URL = process.env.BASE_URL || 'http://localhost'
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`);
})
