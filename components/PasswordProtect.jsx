// components/PasswordProtect.js
import React, { useState, useEffect } from 'react';
import '../app/globals.css';
import Image from 'next/image';
import Head from 'next/head';
import Cookies from 'js-cookie';

const PasswordProtect = ({ children }) => {
    const [input, setInput] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const correctPassword = '1000000000';  // Set your numerical password here
    useEffect(() => {
        const hasAccess = Cookies.get('accessGranted');
        if (hasAccess === 'true') {
            setAccessGranted(true);
        }
    }, []);
    const checkPassword = () => {
        if (input === correctPassword) {
            setAccessGranted(true);
            Cookies.set('accessGranted', 'true', { expires: 7 });  // Set a cookie for 7 days

        } else {
            alert(`INCORRECT PEASANT!`);
            setInput(''); // Reset input if wrong
        }
    };

    if (!accessGranted) {
        return (
            <div className="bg-black" style={{ minHeight: "100vh", padding: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Head>
                    <link rel="icon" href="/wtffav.png" type="image/png" />
                </Head>
                <div className="mx-auto mb-4" style={{ width: '240px', height: 'auto' }}>
                    <Image
                        src="/crest.png"
                        alt="Ba$$ Billionaires Logo"
                        width={1069}  // Adjusted width to numeric value without quotes
                        height={655}  // Adjusted height to numeric value without quotes
                        priority
                    />
                </div>
                <h1 className="font-poiret text-2xl mb-2 text-yellow-500">
                    Enter Password
                </h1>
                <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
                    style={{ marginBottom: '20px' }}  // Add margin-bottom to create space between the input and the button
                />
                <button className="font-poiret text-2xl text-yellow-500" onClick={checkPassword}>
                    Submit
                </button>
            </div>
        );
    }


    return children;
};

export default PasswordProtect;
