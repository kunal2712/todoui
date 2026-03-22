import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    // 1. New error state
    const [error, setError] = useState(''); 
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        // Clear error message when user starts typing again
        if (error) setError(''); 
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors
        
        try {
            const response = await axios.post('https://kdev-todo-api.onrender.com/api/todo/auth/login', formData);
            localStorage.setItem("userId", response.data.id);
            navigate("/home");
        } catch (error) {
            // 2. Set specific error message
            setError("Invalid username or password."); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.loginCard}>
                
                {/* Left Section */}
                <div style={styles.leftSection}>
                    <div style={styles.logo}>✓</div>
                    <h1 style={styles.title}>TaskMaster</h1>
                    <p style={styles.subtitle}>Stay Productive.</p>
                </div>

                {/* Right Section */}
                <div style={{ width: '260px' }}>
                    <h2 style={styles.loginHeader}>Login</h2>
                    
                    {/* 3. Render Error Message UI */}
                    {error && (
                        <div style={styles.errorBadge}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={styles.form}>
                        <input 
                            type="text" name="username" placeholder="Username" 
                            onChange={handleChange} required 
                            style={{
                                ...styles.input,
                                border: error ? '1px solid #ff5252' : '1px solid #444' // Highlight input on error
                            }} 
                        />
                        <input 
                            type="password" name="password" placeholder="Password" 
                            onChange={handleChange} required 
                            style={{
                                ...styles.input,
                                border: error ? '1px solid #ff5252' : '1px solid #444'
                            }} 
                        />
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{ 
                                ...styles.loginBtn, 
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => navigate("/register")}
                            style={styles.registerLink} 
                        >
                            Create New Account
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

const styles = {
    pageWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: '#ffffff', fontFamily: 'Arial, sans-serif' },
    loginCard: { display: 'flex', alignItems: 'center', gap: '50px', padding: '40px', backgroundColor: '#1e1e1e', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' },
    leftSection: { textAlign: 'center', borderRight: '1px solid #333', paddingRight: '50px' },
    logo: { width: '80px', height: '80px', backgroundColor: '#333', borderRadius: '20px', margin: '0 auto 15px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' },
    title: { margin: 0, fontSize: '28px', letterSpacing: '1px' },
    subtitle: { color: '#aaa', fontSize: '14px', marginTop: '5px' },
    loginHeader: { marginTop: 0, marginBottom: '20px', fontSize: '20px' },
    form: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
    input: { width: '100%', padding: '10px', marginBottom: '15px', backgroundColor: '#2c2c2c', color: '#fff', borderRadius: '4px', boxSizing: 'border-box', outline: 'none' },
    loginBtn: { padding: '8px 25px', backgroundColor: '#3d5afe', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' },
    registerLink: { marginTop: '20px', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '13px', padding: 0, textDecoration: 'underline' },
    
    // New Error Style
    errorBadge: { 
        backgroundColor: 'rgba(255, 82, 82, 0.1)', 
        color: '#ff5252', 
        padding: '8px', 
        borderRadius: '4px', 
        fontSize: '13px', 
        marginBottom: '15px',
        border: '1px solid #ff5252',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center'
    }
};

export default Login;