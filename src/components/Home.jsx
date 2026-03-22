import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [modal, setModal] = useState({ open: false, id: null });
    
    // Loader states
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`https://kdev-todo-api.onrender.com/api/todo/${userId}/todos`);
            setTodos(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchTodos(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsAdding(true); // Start Loader
        try {
            await axios.post(`https://kdev-todo-api.onrender.com/api/todo/${userId}/save`, { ...newTodo, isCompleted: false });
            setNewTodo({ title: '', description: '' });
            await fetchTodos(); 
        } catch (err) { 
            alert("Failed to save."); 
        } finally {
            setIsAdding(false); // Stop Loader
        }
    };

    const confirmDelete = async () => {
        setIsDeleting(true); // Start Loader in modal
        try {
            await axios.delete(`https://kdev-todo-api.onrender.com/api/todo/delete/${modal.id}`);
            await fetchTodos();
            setModal({ open: false, id: null });
        } catch (err) { 
            alert("Error"); 
        } finally {
            setIsDeleting(false); // Stop Loader
        }
    };

    return (
        <div style={s.container}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={s.header}>
                    <h1 style={{ fontSize: '24px' }}>My Tasks</h1>
                    <button onClick={() => { localStorage.clear(); navigate("/"); }} style={s.logoutBtn}>Logout</button>
                </div>

                <div style={s.card}>
                    <form onSubmit={handleAdd} style={s.form}>
                        <input placeholder="Title" required value={newTodo.title}
                            onChange={(e) => setNewTodo({...newTodo, title: e.target.value})} style={s.input} />
                        <input placeholder="Description" value={newTodo.description}
                            onChange={(e) => setNewTodo({...newTodo, description: e.target.value})} style={s.input} />
                        
                        {/* Add Button with Loader */}
                        <button 
                            type="submit" 
                            disabled={isAdding}
                            style={{...s.addBtn, opacity: isAdding ? 0.6 : 1, cursor: isAdding ? 'not-allowed' : 'pointer'}}
                        >
                            {isAdding ? "..." : "+ Add"}
                        </button>
                    </form>
                </div>

                <div style={s.list}>
                    {todos.map((t) => (
                        <div key={t.id} style={{...s.todoItem, borderLeft: t.isCompleted ? '4px solid #444' : '4px solid #3d5afe'}}>
                            <div style={{ opacity: t.isCompleted ? 0.5 : 1, flex: 1 }}>
                                <strong style={{ textDecoration: t.isCompleted ? 'line-through' : 'none' }}>{t.title}</strong>
                                <p style={s.todoDesc}>{t.description}</p>
                            </div>
                            <button onClick={() => setModal({ open: true, id: t.id })} style={s.delBtn}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* SMALL CONFIRMATION DIALOG */}
            {modal.open && (
                <div style={s.overlay}>
                    <div style={s.modal}>
                        <h4 style={{ margin: '0 0 10px' }}>Delete Task?</h4>
                        <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 20px' }}>This cannot be undone.</p>
                        <div style={s.modalActions}>
                            <button 
                                onClick={() => setModal({ open: false, id: null })} 
                                style={s.btnSec}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                style={{...s.btnDanger, opacity: isDeleting ? 0.6 : 1}}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MINI CSS-IN-JS ---
const s = {
    container: { backgroundColor: '#121212', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
    logoutBtn: { background: 'red', border: '1px solid #444', color: 'white', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer',width: '70px',height: '30px', fontSize: '12px' },
    card: { backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
    form: { display: 'flex', gap: '8px' },
    input: { flex: 1, padding: '10px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px' },
    addBtn: { backgroundColor: '#3d5afe', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '4px', minWidth: '70px' },
    list: { display: 'flex', flexDirection: 'column', gap: '10px' },
    todoItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 15px', backgroundColor: '#1e1e1e', borderRadius: '6px' },
    todoDesc: { margin: '2px 0 0', color: '#888', fontSize: '13px' },
    delBtn: { background: 'red', border: 'none', color: 'white', cursor: 'pointer', fontSize: '13px',borderRadius: '4px'  },
    overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
    modal: { backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px', width: '260px', textAlign: 'center', border: '1px solid #333' },
    modalActions: { display: 'flex', gap: '10px' },
    btnSec: { flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer' },
    btnDanger: { flex: 1, padding: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#ff5252', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }
};

export default Home;