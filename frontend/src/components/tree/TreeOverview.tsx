"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    Brain,
    Sparkles,
    TrendingUp,
    Trophy,
} from "lucide-react";
import { memo } from "react";

interface TreeOverviewProps {
    level: number;

    xp: number;

    completed: number;

    total: number;

    branches: number;

    currentBranch: string;

    progress: number;
}

function StatCard({
    icon,
    value,
    label,
    color,
}:{
    icon:React.ReactNode;
    value:string|number;
    label:string;
    color:string;
}){

    return(

        <motion.div

            whileHover={{
                y:-4,
                scale:1.02,
            }}

            className="flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-md px-4 py-3 shadow-md border border-white"

        >

            <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                    background:color,
                }}
            >
                {icon}
            </div>

            <div>

                <p className="font-bold text-lg text-slate-800">
                    {value}
                </p>

                <p className="text-xs text-slate-500">
                    {label}
                </p>

            </div>

        </motion.div>

    );

}

function TreeOverview({

    level,

    xp,

    completed,

    total,

    branches,

    currentBranch,

    progress,

}:TreeOverviewProps){

    return(

<motion.div

initial={{
opacity:0,
y:-20,
}}

animate={{
opacity:1,
y:0,
}}

transition={{
duration:.6,
}}

className="w-full rounded-3xl bg-white/75 backdrop-blur-xl border border-white shadow-xl p-6"

>

<div className="flex justify-between items-start">

<div>

<h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">

🌳 Neural Tree

</h2>

<p className="text-slate-500 mt-2">

Master psychology visually through connected knowledge.

</p>

</div>

<div className="text-right">

<p className="text-sm text-slate-500">

Current Level

</p>

<h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">

{level}

</h1>

</div>

</div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

<StatCard

icon={<Sparkles color="white"/>}

value={xp}

label="Total XP"

color="#F97316"

/>

<StatCard

icon={<BookOpen color="white"/>}

value={`${completed}/${total}`}

label="Topics"

color="#8B5CF6"

/>

<StatCard

icon={<Brain color="white"/>}

value={branches}

label="Branches"

color="#22C55E"

/>

<StatCard

icon={<Trophy color="white"/>}

value={`${progress}%`}

label="Progress"

color="#EC4899"

/>

</div>

<div className="mt-8">

<div className="flex justify-between mb-2">

<span className="font-semibold text-slate-700">

Overall Progress

</span>

<span className="font-bold text-orange-500">

{progress}%

</span>

</div>

<div className="w-full h-4 rounded-full bg-orange-100 overflow-hidden">

<motion.div

initial={{
width:0,
}}

animate={{
width:`${progress}%`,
}}

transition={{
duration:1.5,
}}

className="h-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"

/>

</div>

</div>

<div className="mt-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 p-5 border border-orange-100">

<div>

<p className="text-xs uppercase tracking-widest text-slate-500">

Current Focus

</p>

<h3 className="text-xl font-bold text-slate-800 mt-1">

{currentBranch}

</h3>

</div>

<div className="flex items-center gap-2 text-orange-500">

<TrendingUp size={22}/>

<span className="font-semibold">

Keep Learning

</span>

</div>

</div>

</motion.div>

);

}

export default memo(TreeOverview);
