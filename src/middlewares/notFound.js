export default function notFound(req, res) {
    res.status(404).json({ error: true, message: 'Rota não encontrada' });
}