// app/api/todos/route.js

const todos = []

export async function GET(request) {
    return new Response(JOSN.stringify(todos), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST(request) {
    try {
        const { title, completed } = await request.json();
        const newTodo = { id: Date.now(), title, completed };
        todos.push(newTodo);
        return new Response(JOSN.stringify(todos), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid data' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}