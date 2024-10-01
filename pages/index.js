import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import '../app/globals.css';
import Head from 'next/head';
const HomePage = () => {
    return (
        <>
            <Head>
                <link rel="icon" href="/wtffav.png" type="image/png" />
            </Head>

            <div style={{
                height: '100vh',  // Ensures it takes the full height of the viewport
                width: '100vw',  // Ensures it takes the full width of the viewport
                display: "flex",
                flexDirection: "column",  // Organizes children in a column
                alignItems: "center",  // Centers children horizontally
                justifyContent: "center",  // Centers children vertically
                position: 'relative',  // Needed for absolute positioning inside
                overflow: 'hidden',  // Hide anything that goes outside the viewport
                backgroundColor: '#6a0dad'  // Ensures a uniform background color
            }}>
                <div style={{
                    width: '100%',  // Full width
                    height: '50%',  // Half of the viewport height for the logo
                    position: 'relative',  // Relative for positioning the Image
                    overflow: 'hidden'
                }}>
                    <Image
                        src="/wtfbasic.png"
                        alt="Logo"
                        layout="fill"
                        objectFit="contain"  // Ensures the logo is fully visible
                        priority
                    />
                </div>
                <div style={{
                    color: '#fff',  // Ensures text is visible on a dark background
                    textAlign: 'center',  // Centers the text
                    padding: '20px',  // Adds spacing around the text
                    maxWidth: '600px',  // Maximum width of the text container
                }}>
                    <h1>WTF?</h1>
                    <p>A former lion tamer, Adele ran away from the circus to join the foreign legion. Her file states that she didn't last long and was court martialled for
                        an event referred to as "the incident". </p>
                    <br />
                    <p>No one knows where Emily came from. She can't speak any known language and communicates mostly through gestures. She makes a mean cup of tea.</p>
                    <br />
                    <p>Together they are WTF Productions and throw parties and stuff.</p>
                </div>
                <Link href="/billionaire" passHref>
                    <p style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '10px 20px',
                        backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background for visibility
                        borderRadius: '5px',  // Rounded corners
                        alignItems: "center",  // Centers children horizontally
                        justifyContent: "center",  // Centers children vertically
                    }}>
                        Bass Billionaires
                    </p>
                </Link>
            </div>
        </>

    );
};

export default HomePage;
