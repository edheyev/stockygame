"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";


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
        <p>
          IYKYK we’re full of surprises, but here is a sneak peek at just a few
          elements of the participative production:
        </p>
        <p>
          Arrive with the story of how you made your first billion - and outfits
          to match.
        </p>
        <p>Thursday 🦃 An opulent feast served for early birds</p>
        <p>Friday 💎 The Diamond Droppings Party 🪩</p>
        <p>
          Saturday 🧬 Innovation Conference: Compete for investment in your plan
          to make your next billion
        </p>
        <p>Sunday 🤑👁️‍🗨️ Who runs the world?</p>
        <h2 className="text-xl font-semibold mt-6">Plus 1’s</h2>
        <p>Each invited guest can book one other ticket as a plus 1.</p>
        <p>Your plus 1 will be connected to you.</p>
        <p>
          Please be mindful of anyone you choose to bring into this space. Help
          us make sure everyone at Ba$$ Billionaires is a high-quality human,
          wealthy in spirit, with a rich personality, crystal moral compass, and
          heart of gold.
        </p>
        <p>If you’re not sure, ask!</p>
        <h2 className="text-xl font-semibold mt-6">Shhh!</h2>
        <p>This is a tupperware party. Please keep a lid on it.</p>
        <p>
          Do not discuss the event on social media or in wider social circles,
          or share information about the event with any wider network.
        </p>
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
          <a href="your-link-here"> three x payment plan link</a>
        </p>
        <p>
          <em>A note:</em> Skimming all the cream off the top of our respective
          countries’ economies has really worked, and costs are skyrocketing.
          Not to space like us, but pretty damn high!
        </p>
        <p>
          We thought you might want to check out how your investment is
          dividended [for tax purposes]. On average, a shareholder’s return
          includes:
        </p>
        <ul>
          <li>
            £17/night for your own warm comfy bed, surrounded by rural paradise
          </li>
          <li>£10/day for 2 lavish plant-based feasts</li>
          <li>£15/day to experience a one in a billion event</li>
        </ul>
        <p>
          WTF Productions sequestrates every fraction of cryptocoin mined to
          produce the most banging event possible.
        </p>
        <p>
          If you have any further questions about tickets, please feel free to
          have your people call our people.
        </p>
      </>
    ),
  };

  const handleButtonClick = (newKey) => {
    setContentKey((prevKey) => (prevKey === newKey ? "" : newKey));
  };

  return (
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
          <div className="mt-10">
            <Countdown />
          </div>
          <img
            src="/crest.png"
            alt="Ba$$ Billionaires Logo"
            className="w-60 h-auto mx-auto mb-4"
          />
          <h1
            className="text-8xl font-bold mb-8 font-display text-stone-300"
            style={{
              textShadow:
                "2px 2px 0px #eb452b, 4px 4px 0px #efa032, 6px 6px 0px #46b59b, 8px 8px 0px #017e7f, 10px 10px 0px #052939",
            }}
          >
            Bass Billionaires
          </h1>

          <hr style={{
            border: 'none',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #fbbf24, transparent)',
            width: '50%',
            margin: '18px auto'
          }} />          <h2 className="text-4xl mb-4 font-extralight font-ballet text-yellow-500 tracking-widest">
            Elite Opulence
          </h2>
          <hr style={{
            border: 'none',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #fbbf24, transparent)',
            width: '50%',
          }} />        </div>

        <div className="mt-6 flex items-center justify-center">
          <h2
            style={{ fontSize: "40px" }}
            className="font-poiret text-2xl mb-2 text-yellow-500"
          >
            Thursday 6th March 5pm - Monday 10th March 10am
          </h2>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <Button
              onClick={() => handleButtonClick("ticketInfo")}
              style={{ fontSize: "40px" }}
              className="relative z-0 h-12 w-auto px-8 rounded-full font-poiret border border-yellow-800 text-yellow-500 bg-transparent transition-all duration-300 hover:bg-amber-700 hover:text-neutral-50"
            >
              Purchase Ticket
            </Button>
          </a>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handleButtonClick("sneakPeak")}
            style={{ fontSize: "40px" }}
            className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100"
          >
            About
          </button>
          <button
            onClick={() => handleButtonClick("ticketInfo")}
            style={{ fontSize: "40px" }}
            className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100"
          >
            Ticket Info
          </button>
          <button
            onClick={() => handleButtonClick("location")}
            style={{ fontSize: "40px" }}
            className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100"
          >
            Location
          </button>
          <button
            onClick={() => handleButtonClick("merch")}
            style={{ fontSize: "40px" }}
            className="bg-transparent font-poiret relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-yellow-700 after:transition-transform after:duration-500 hover:after:origin-bottom hover:after:scale-x-100"
          >
            Merch
          </button>
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
    </div>
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
    <div className="text-lg text-center font-display">
      <h2>
        {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes{" "}
        {timeLeft.seconds} Seconds
      </h2>
    </div>
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
