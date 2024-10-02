"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import '../app/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import PasswordProtect from '../components/PasswordProtect';


export default function Home() {
  const [contentKey, setContentKey] = useState("");

  const contentMap = {
    location: (
      <p className="text-lg">
        Exclusive wilderness mansion location [sleeps 65]
        <br /> 📍Buxton SK17 8SS
      </p>
    ),
    sneakPeak: (
      <>
        <h1>You are invited to THE VIP Exclusive Experience</h1>
        <p>This quarter past millennium - <strong>BASS BILLIONAIRES</strong>, a one and only once in a lifetime private event guaranteed to elevate your status.</p>

        <p>Is it a fantabulous celebration of unparalleled richness? Is it an opulent feast for the senses? Is it a wilderness getaway, traversing the galloping moors surrounding a hoary estate? Is it a gathering of high-value individuals with shared mutual interests? Is it a chance to pitch to some of the biggest wigs for more than 1 billion units of valuable cryptocurrency to fund your disruptions? <strong>Yes, yes, yes, and more, friends.</strong> It will be what we make it, for we own it, and its future is in our possession.</p>

        <p><strong>Warm, dry & comfortable beds</strong> and <strong>2 lavish meals</strong> are yours to enjoy each day.</p>

        <h2>IYKYK we’re full of surprises, but here is a sneak peak at what’s in store:</h2>
        <ul>
          <li><strong>Thursday 🦃</strong> An opulent feast served for early birds</li>
          <li><strong>Friday 💎</strong> The Diamond Droppings Party 🪩</li>
          <li><strong>Saturday 🧬</strong> Innovation Conference: Compete for investment in your Vision To Make Your Next Billion</li>
          <li><strong>Sunday 🤑👁️‍🗨️</strong> Who runs the world?</li>
        </ul>

        <p><strong>Shhh! Zip it, Zaddy</strong></p>
        <p>This is a tupperware party. Please keep a lid on it. Please use discretion and protect the privacy of our guests. Do not discuss the event on social media or share information about the event with wider networks.</p>
      </>

    ),
    ticketInfo: (
      <>
        <p>
          <strong>Big Ol’ Ballers £180</strong> — If you can, please do. Make
          trickle-down economics work again!
        </p>
        <p>
          <strong>Hoi Polloi Bois £160</strong> — For the pretty bourgeoisie.
        </p>
        <p>
          <strong>Van dwellers & bankruptcy support £135</strong> — If you are
          planning to sleep in your vehicle, or the feds have frozen your
          liquidities or whatever, we have set aside 15 tickets at this price
          point.
        </p>
        <p>
          Buy your ticket now — we take cash, credit, check, money-order, gold,
          and cigarette cartons.
        </p>
        <p>
          <strong>Cashflow issues?</strong> Capitol stuck in the Bermuda
          Triangle? Too lovedrunk for a prenup and now hemorrhaging alimony? Put
          your pennies down in parts here:
          <a href="your-link-here"> <strong>three x payment plan link</strong></a>
        </p>
      </>
    ),
    faq: (
      <>
        <h1>Bass Billionaires FAQs</h1>

        <h2>Can I bring a plus 1?</h2>
        <p>Each VIP is invited to book one other ticket as a plus 1. Your plus 1 will be connected to you. Please be mindful of who you consider to bring into this space. Help us make sure everyone at Bass Billionaires is the highest quality human, wealthy in spirit, with a rich personality, crystal moral compass, and heart of pure gold. If you’re not sure, ask us!</p>

        <h2>What does my ticket go towards?</h2>
        <p>Skimming all the cream off the top of our respective countries’ economies has really worked, and costs are skyrocketing. Not to space like us, but pretty damn high! We thought you might want to check out how your investment is dividended [for tax purposes]. On average, a shareholder’s return includes:</p>
        <ul>
          <li>£17/night for your own warm comfy bed, surrounded by rural paradise</li>
          <li>£10/day for 2 lavish feasts, breakfast & dinner</li>
          <li>£15/day to experience a one in a billion event</li>
        </ul>
        <p>WTF Productions sequestrates every fraction of cryptocoin mined to produce the most banging event possible.</p>

        <h2>What should I expect? How should I prepare?</h2>
        <p>BB is a cross between a festival, a show, a weekend gathering of friends, and a simple, silly celebration of life on our bizarre planet. The estate and surrounding lands are gargantuan and can contain anything from raucous parties, off-grid adventures, more ambient ambience, dance-offs, pillow fights, and fireside chats over cups of tea simultaneously.</p>
        <p>The event is highly participative, and every guest will be asked to come with the story of how they got their first billion, and outfits to match. There will be lots of opportunities throughout the weekend to participate, for example presenting at Saturday’s Innovation Conference or any number of other activities. Mood boards and theme materials will be released as the event approaches!</p>
        <p>If you wish to contribute an idea, talent, or offering, feel free to reach out.</p>

        <h2>Where will I sleep?</h2>
        <p>There are more than a dozen rooms with different setups of 3-8 comfy, clean beds per room. Sign-up sheets will go out so you can choose your bed in advance. Sheets, duvets, and pillows are all included, and there are plenty of bathrooms. Bring your own towel, slippers, and earplugs for maximum comfort and coziness.</p>
        <p>If you have a van and will sleep in your vehicle, that works as well. There is plenty of parking on site.</p>

        <h2>What will I eat?</h2>
        <p>WTF Productions will serve breakfast and dinner each day in the dining room. These foodie feasts will be prepared by billionaires, for billionaires. All billionaires are asked to put in at least one kitchen shift. This is a chance to really get hands-on and add so much value that you’re dripping grease from your elbows to your bootstraps. Divulge any dietary restrictions when you RSVP.</p>
      </>
    )
  };

  const handleButtonClick = (newKey) => {
    setContentKey((prevKey) => (prevKey === newKey ? "" : newKey));
  };

  return (
    <PasswordProtect>
      <>
        <Head>
          <link rel="icon" href="/wtffav.png.png" type="image/png" />
        </Head>
        <div
          className="min-h-screen bg-cover bg-center text-white font-body"
          style={{
            backgroundImage: 'url("/cash.png")',
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}
        >
          <div className="bg-black bg-opacity-50 min-h-screen p-10">
            <Header />


            <div className="flex flex-col items-center">
              <div className="mt-10 ">
                <Countdown />
              </div>
              <div className="mx-auto mb-4" style={{ width: '240px', height: 'auto' }}> {/* Adjust the width here to match the desired width like w-60 in Tailwind */}
                <Image
                  src="/crest.png"
                  alt="Ba$$ Billionaires Logo"
                  width={'1069'}  // Actual width of the image in pixels
                  height={'655'}  // Actual height of the image in pixels
                />
              </div>
              <h1
                className="text-6xl md:text-8xl font-bold mb-8 font-beng text-stone-300 text-center"
                style={{
                  textShadow:
                    "2px 2px 0px #eb452b, 4px 4px 0px #efa032, 6px 6px 0px #46b59b, 8px 8px 0px #017e7f, 10px 10px 0px #052939",
                }}
              >
                Bass Billionaires
              </h1>

              <hr
                style={{
                  border: 'none',
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, #fbbf24, transparent)',
                  width: '80%',  // Adjust width for smaller screens
                  maxWidth: '500px',  // Max width for large screens
                  margin: '18px auto',
                }}
              />          <h2 className="text-4xl mb-4 font-extralight font-ballet text-yellow-500 tracking-widest">
                Elite Opulence
              </h2>
              <hr
                style={{
                  border: 'none',
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, #fbbf24, transparent)',
                  width: '80%',  // Adjust width for smaller screens
                  maxWidth: '500px',  // Max width for large screens
                }}
              />       </div>

            <div className="mt-6 flex items-center justify-center text-center">
              <h2
                style={{ fontSize: "40px" }}
                className="py-10	font-poiret text-2xl mb-2 text-yellow-500 text-center;"
              >
                <strong>Thursday 6th March</strong> 5pm <br />to <br /> <strong>Monday 10th March</strong> 10am
              </h2>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <Button
                  onClick={() => handleButtonClick("ticketInfo")}
                  className="relative z-0 px-8 sm:px-10 md:px-14 lg:px-16 xl:px-20 h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 rounded-full font-poiret border border-yellow-800 text-yellow-500 bg-transparent transition-all duration-300 hover:bg-red-900 hover:text-neutral-50 text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                  Claim your place
                </Button>
              </a>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => handleButtonClick("sneakPeak")}
                className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 py-2"
              >
                WTF is this?
              </button>
              <button
                onClick={() => handleButtonClick("ticketInfo")}
                className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 py-2"
              >
                Ticket Info
              </button>
              <button
                onClick={() => handleButtonClick("location")}
                className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 py-2"
              >
                Location
              </button>

              <button
                onClick={() => handleButtonClick("faq")}
                className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 py-2"
              >
                FAQ
              </button>
              <Link href="/merch" passHref>
                <button
                  onClick={() => handleButtonClick("merch")}
                  className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 py-2"
                >
                  Merch
                </button>
              </Link>
            </div>


            {contentKey ? (
              <div className="text-content mx-auto max-w-prose text-left space-y-4 mt-6 bg-black bg-opacity-60 p-6 rounded-md">
                {contentMap[contentKey]}
              </div>
            ) : <></>}

            <footer className="mt-10 text-center text-sm text-yellow-500 bg-black bg-opacity-75 p-4">
              <p>&copy; 2025 Ba$$ Billionaires. WTF. All rights reserved.</p>
            </footer>
          </div>
        </div >
      </>
    </PasswordProtect>
  );

}

function Countdown() {
  const calculateTimeLeft = () => {
    const eventDate = new Date("2025-03-06T17:00:00");
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Fix hydration error by ensuring countdown runs only after component mounts
    setHasMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) {
    return null; // Avoid hydration issues by not rendering until mounted
  }

  return (
    <div className="text-3xl text-center font-display" style={{
      marginBottom: '20px'
    }}>
      <h2>
        {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes{" "}
        {timeLeft.seconds} Seconds
      </h2>
    </div >
  );




}

const Header = () => {
  return (
    <header>
      {/* <Link href="/wtf" passHref>
        <Image src="/wtfLogo.png" alt="Hosts" width={100} height={100} />
      </Link> */}
    </header>
  );
};
