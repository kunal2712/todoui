import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [modal, setModal] = useState({ open: false, id: null });
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600); // Mobile threshold

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    // Handle Resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`https://kdev-todo-api.onrender.com/api/todo/${userId}/todos`);
            setTodos(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchTodos(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        try {
            await axios.post(`https://kdev-todo-api.onrender.com/api/todo/${userId}/save`, { ...newTodo, isCompleted: false });
            setNewTodo({ title: '', description: '' });
            await fetchTodos(); 
        } catch (err) { 
            alert("Failed to save."); 
        } finally {
            setIsAdding(false);
        }
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`https://kdev-todo-api.onrender.com/api/todo/delete/${modal.id}`);
            await fetchTodos();
            setModal({ open: false, id: null });
        } catch (err) { 
            alert("Error"); 
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div style={s.container}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={s.header}>
                    <h1 style={{ fontSize: isMobile ? '20px' : '24px' }}>My Tasks</h1>
                    <button onClick={() => { localStorage.clear(); navigate("/"); }} style={s.logoutBtn}>Logout</button>
                </div>

                <div style={s.card}>
                    <form onSubmit={handleAdd} style={{
                        ...s.form,
                        flexDirection: isMobile ? 'column' : 'row' // Stack form on mobile
                    }}>
                        <input placeholder="Title" required value={newTodo.title}
                            onChange={(e) => setNewTodo({...newTodo, title: e.target.value})} 
                            style={{...s.input, fontSize: '16px'}} 
                        />
                        <input placeholder="Description" value={newTodo.description}
                            onChange={(e) => setNewTodo({...newTodo, description: e.target.value})} 
                            style={{...s.input, fontSize: '16px'}} 
                        />
                        
                        <button 
                            type="submit" 
                            disabled={isAdding}
                            style={{
                                ...s.addBtn, 
                                opacity: isAdding ? 0.6 : 1, 
                                cursor: isAdding ? 'not-allowed' : 'pointer',
                                padding: isMobile ? '12px' : '0 15px',
                                height: isMobile ? '45px' : 'auto'
                            }}
                        >
                            {isAdding ? "..." : "+ Add Task"}
                        </button>
                    </form>
                </div>

                <div style={s.list}>
                    {todos.map((t) => (
                        <div key={t.id} style={{
                            ...s.todoItem, 
                            borderLeft: t.isCompleted ? '4px solid #444' : '4px solid #3d5afe',
                            alignItems: isMobile ? 'flex-start' : 'center'
                        }}>
                            <div style={{ opacity: t.isCompleted ? 0.5 : 1, flex: 1 }}>
                                <strong style={{ 
                                    textDecoration: t.isCompleted ? 'line-through' : 'none',
                                    fontSize: isMobile ? '15px' : '16px' 
                                }}>
                                    {t.title}
                                </strong>
                                <p style={s.todoDesc}>{t.description}</p>
                            </div>
                            <button 
                                onClick={() => setModal({ open: true, id: t.id })} 
                                style={{
                                    ...s.delBtn,
                                    padding: isMobile ? '8px 12px' : '5px 12px'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL remains centered for all screens */}
            {modal.open && (
                <div style={s.overlay}>
                    <div style={{...s.modal, width: isMobile ? '85%' : '260px'}}>
                        <h4 style={{ margin: '0 0 10px' }}>Delete Task?</h4>
                        <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 20px' }}>This cannot be undone.</p>
                        <div style={s.modalActions}>
                            <button onClick={() => setModal({ open: false, id: null })} style={s.btnSec} disabled={isDeleting}>
                                Cancel
                            </button>
                            <button onClick={confirmDelete} style={{...s.btnDanger, opacity: isDeleting ? 0.6 : 1}} disabled={isDeleting}>
                                {isDeleting ? "..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const s = {
    container: { backgroundColor: '#121212', minHeight: '100vh', color: '#fff', padding: '20px', boxSizing: 'border-box', fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    logoutBtn: { background: '#ff5252', border: 'none', color: 'white', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
    card: { backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
    form: { display: 'flex', gap: '10px' },
    input: { flex: 1, padding: '12px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px', outline: 'none' },
    addBtn: { backgroundColor: '#3d5afe', color: '#fff', border: 'none', borderRadius: '4px', minWidth: '90px', fontWeight: 'bold' },
    list: { display: 'flex', flexDirection: 'column', gap: '10px' },
    todoItem: { display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#1e1e1e', borderRadius: '6px', gap: '10px' },
    todoDesc: { margin: '4px 0 0', color: '#888', fontSize: '13px', lineHeight: '1.4' },
    delBtn: { background: 'rgba(255, 82, 82, 0.1)', border: '1px solid #ff5252', color: '#ff5252', cursor: 'pointer', fontSize: '12px', borderRadius: '4px', transition: '0.3s' },
    overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, padding: '20px' },
    modal: { backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '12px', textAlign: 'center', border: '1px solid #333' },
    modalActions: { display: 'flex', gap: '10px' },
    btnSec: { flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer' },
    btnDanger: { flex: 1, padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#ff5252', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }
};

export default Home;