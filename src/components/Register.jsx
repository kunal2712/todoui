import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', username: '', mail: '', password: '' });
    const [isRegistered, setIsRegistered] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    // Track screen size for responsiveness
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://kdev-todo-api.onrender.com/api/todo/auth/register', formData);
            setIsRegistered(true);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Registration failed.");
        }
    };

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            minHeight: '100vh', backgroundColor: '#121212', color: '#ffffff', 
            fontFamily: 'Arial, sans-serif', padding: '20px', boxSizing: 'border-box'
        }}>
            
            {/* --- REGISTRATION MODAL POPUP --- */}
            {isRegistered && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 100, padding: '20px', boxSizing: 'border-box'
                }}>
                    <div style={{
                        backgroundColor: '#1e1e1e', padding: isMobile ? '30px 20px' : '40px', 
                        borderRadius: '12px', textAlign: 'center', border: '1px solid #3d5afe', 
                        boxShadow: '0 0 20px rgba(61, 90, 254, 0.3)', width: '100%', maxWidth: '400px'
                    }}>
                        <div style={{ fontSize: '50px', color: '#3d5afe', marginBottom: '10px' }}>✔</div>
                        <h2 style={{ margin: '0 0 10px', fontSize: isMobile ? '20px' : '24px' }}>Registered Successfully!</h2>
                        <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '14px' }}>Your account is ready. Please log in to continue.</p>
                        <button 
                            onClick={() => navigate("/")}
                            style={{ 
                                padding: '12px 30px', backgroundColor: '#3d5afe', color: 'white', 
                                border: 'none', borderRadius: '4px', cursor: 'pointer', 
                                fontWeight: 'bold', width: isMobile ? '100%' : 'auto'
                            }}
                        >
                            Proceed to Login
                        </button>
                    </div>
                </div>
            )}

            {/* --- MAIN PAGE CONTENT --- */}
            <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', // Responsive Direction
                alignItems: 'center', 
                gap: isMobile ? '30px' : '50px', 
                padding: isMobile ? '30px 20px' : '40px', 
                backgroundColor: '#1e1e1e', borderRadius: '12px', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '400px' : 'none'
            }}>
                
                {/* Left Section: Logo & Title */}
                <div style={{ 
                    textAlign: 'center', 
                    borderRight: isMobile ? 'none' : '1px solid #333', 
                    borderBottom: isMobile ? '1px solid #333' : 'none',
                    paddingRight: isMobile ? '0' : '50px',
                    paddingBottom: isMobile ? '30px' : '0',
                    width: isMobile ? '100%' : 'auto'
                }}>
                    <div style={{ 
                        width: isMobile ? '60px' : '80px', 
                        height: isMobile ? '60px' : '80px', 
                        backgroundColor: '#333', 
                        borderRadius: '15px', margin: '0 auto 15px', display: 'flex', 
                        justifyContent: 'center', alignItems: 'center', fontSize: isMobile ? '30px' : '40px' 
                    }}>
                        ✓
                    </div>
                    <h1 style={{ color: '#aaa' ,margin: 0, fontSize: isMobile ? '24px' : '28px', letterSpacing: '1px' }}>TaskMaster</h1>
                    <p style={{ color: '#aaa', fontSize: '14px', marginTop: '5px' }}>Join the community.</p>
                </div>

                {/* Right Section: Form */}
                <div style={{ width: isMobile ? '100%' : '280px' }}>
                    <h2 style={{ color: '#aaa', marginTop: 0, marginBottom: '20px', fontSize: '20px', textAlign: isMobile ? 'center' : 'left' }}>Sign Up</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required 
                            style={{ width: '100%', padding: '12px', marginBottom: '12px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }} 
                        />
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} required 
                            style={{ width: '100%', padding: '12px', marginBottom: '12px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }} 
                        />
                        <input type="email" name="mail" placeholder="Email Address" onChange={handleChange} required 
                            style={{ width: '100%', padding: '12px', marginBottom: '12px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }} 
                        />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
                            style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }} 
                        />
                        <button type="submit" style={{ 
                            padding: '12px 25px', backgroundColor: '#3d5afe', color: 'white', 
                            border: 'none', borderRadius: '4px', cursor: 'pointer', 
                            fontWeight: 'bold', width: isMobile ? '100%' : 'auto' 
                        }}>
                            Register
                        </button>
                        <button type="button" onClick={() => navigate("/")} style={{ 
                            marginTop: '20px', background: 'none', border: 'none', 
                            color: '#aaa', cursor: 'pointer', fontSize: '13px', 
                            textDecoration: 'underline', width: isMobile ? '100%' : 'auto', textAlign: 'center' 
                        }}>
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;