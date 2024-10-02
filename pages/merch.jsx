import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../app/globals.css';
import { Button } from "@/components/ui/button";

const merchandiseItems = [
    { id: 1, name: `Luxury Limo`, description: `Travel in style with a limo that has a pool and a helipad.`, price: "£1,000,000", imageUrl: "/limo.jpg" },
    { id: 2, name: `The Yacht`, description: `Rule the waves with this gold-plated yacht that screams luxury.`, price: "£5,000,000", imageUrl: "/boat.jpg" },
    { id: 3, name: `Expensive Water`, description: `S-tier drinking experience.`, price: "£69,000", imageUrl: "/challice.jpg" },
    { id: 4, name: `Diamond Sausage`, description: `Swarovski himself shat this deluxe mega-turd. One of a kind.`, price: "£420,000", imageUrl: "/diamondsausage.webp" },
    { id: 5, name: `Certified Natural Jadeite Jade Decoration 'Fruity Gourds'`, description: `Isn't it obvious?`, price: "£243,865.19", imageUrl: "/fruitygourd.webp" },
    { id: 6, name: `Clone Army!`, description: `Select from our surprisingly large DNA pool and be ready for ANY eventuality ;).`, price: "£12,345,000,000", imageUrl: "/clones.jpg" },
    { id: 7, name: `Ultra-exclusive, VIP Only, Expedition of the Year!`, description: `Join our team of actual experts and travel the deeps in a space no peasant can reach. See the wreck of the Titanic with your own eyes!`, price: "Price on Request", imageUrl: "/Titanic.jpg" },
];


const MerchPage = () => {
    return (
        <div className="min-h-screen bg-cover bg-center text-white font-body"
            style={{
                backgroundImage: 'url("/luxurybrands.png")',
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
                padding: '20px'
            }}>
            <Link href="/billionaire" passHref>
                <button
                    style={{
                        backgroundColor: 'black',
                        color: 'maroon',
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginBottom: "20px",
                        alignSelf: "flex-start"
                    }}
                >
                    ← Back to Billionaires
                </button>
            </Link>
            <h2 className="text-6xl font-beng mb-8 font-josefin text-black text-center">
                Event Exclusive Merchandise for <Link href="/billionaire" passHref>Billionaires</Link> ONLY.
            </h2>
            <p className="text-xl font-bold mb-8 font-josefin text-black text-center">
                Have your people talk to our people.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {merchandiseItems.map(item => (
                    <div key={item.id} className="bg-black bg-opacity-75 p-4 rounded-lg flex flex-col items-center text-center">
                        <div className="relative w-full h-64">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                                className="rounded-lg"
                                quality={100}
                                priority
                            />
                        </div>
                        <h3 className="text-4xl mt-8 font-julius">{item.name}</h3>
                        <p className="text-2xl my-2 font-poiret">{item.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px' }}>
                            <p className="font-dede" style={{ paddingRight: '20px' }}>{item.price}</p>
                            <a href="https://www.youtube.com/watch?v=H7zjr0QYzu0" target="_blank" rel="noopener noreferrer">
                                <Button
                                    onClick={() => handleButtonClick("ticketInfo")}
                                    className=" rounded font-dede border border-yellow-800 text-yellow-500 bg-transparent transition-all duration-300 hover:bg-red-900 hover:text-neutral-50 text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                                >
                                    Buy now
                                </Button>
                            </a>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MerchPage;
