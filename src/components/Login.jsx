import { useState, useEffect } from 'react'; // Added useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); 
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track screen size
    
    const navigate = useNavigate();

    // Handle screen resizing
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        if (error) setError(''); 
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); 
        
        try {
            const response = await axios.post('https://kdev-todo-api.onrender.com/api/todo/auth/login', formData);
            localStorage.setItem("userId", response.data.id);
            navigate("/home");
        } catch (error) {
            setError("Invalid username or password."); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={{
                ...styles.loginCard,
                flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile
                gap: isMobile ? '30px' : '50px',
                padding: isMobile ? '30px 20px' : '40px',
                width: isMobile ? '90%' : 'auto'
            }}>
                
                {/* Left Section */}
                <div style={{
                    ...styles.leftSection,
                    borderRight: isMobile ? 'none' : '1px solid #333',
                    borderBottom: isMobile ? '1px solid #333' : 'none',
                    paddingRight: isMobile ? '0' : '50px',
                    paddingBottom: isMobile ? '30px' : '0',
                    width: isMobile ? '100%' : 'auto'
                }}>
                    <div style={styles.logo}>✓</div>
                    <h1 style={styles.title}>TaskMaster</h1>
                    <p style={styles.subtitle}>Stay Productive.</p>
                </div>

                {/* Right Section */}
                <div style={{ width: isMobile ? '100%' : '260px' }}>
                    <h2 style={{...styles.loginHeader, textAlign: isMobile ? 'center' : 'left'}}>Login</h2>
                    
                    {error && (
                        <div style={styles.errorBadge}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{
                        ...styles.form,
                        alignItems: isMobile ? 'center' : 'flex-start'
                    }}>
                        <input 
                            type="text" name="username" placeholder="Username" 
                            onChange={handleChange} required 
                            style={{
                                ...styles.input,
                                border: error ? '1px solid #ff5252' : '1px solid #444' 
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
                                width: isMobile ? '100%' : 'auto', // Full width button on mobile
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => navigate("/register")}
                            style={{
                                ...styles.registerLink,
                                width: isMobile ? '100%' : 'auto',
                                textAlign: 'center'
                            }} 
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
    pageWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121212', color: '#ffffff', fontFamily: 'Arial, sans-serif', padding: '20px', boxSizing: 'border-box' },
    loginCard: { display: 'flex', alignItems: 'center', backgroundColor: '#1e1e1e', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', boxSizing: 'border-box' },
    leftSection: { textAlign: 'center', boxSizing: 'border-box' },
    logo: { width: '80px', height: '80px', backgroundColor: '#333', borderRadius: '20px', margin: '0 auto 15px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' },
    title: {color: '#aaa' , margin: 0, fontSize: '28px', letterSpacing: '1px' },
    subtitle: { color: '#aaa', fontSize: '14px', marginTop: '5px' },
    loginHeader: {color: '#aaa', marginTop: 0, marginBottom: '20px', fontSize: '20px' },
    form: { display: 'flex', flexDirection: 'column' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#2c2c2c', color: '#fff', borderRadius: '4px', boxSizing: 'border-box', outline: 'none', fontSize: '16px' },
    loginBtn: { padding: '12px 25px', backgroundColor: '#3d5afe', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' },
    registerLink: { marginTop: '20px', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '13px', padding: 0, textDecoration: 'underline' },
    errorBadge: { backgroundColor: 'rgba(255, 82, 82, 0.1)', color: '#ff5252', padding: '8px', borderRadius: '4px', fontSize: '13px', marginBottom: '15px', border: '1px solid #ff5252', width: '100%', boxSizing: 'border-box', textAlign: 'center' }
};

export default Login;