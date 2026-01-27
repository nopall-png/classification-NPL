"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
    speed?: number;
    starCount?: number;
}

export default function Starfield({ speed = 0.05, starCount = 400 }: StarfieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number }[] = [];

        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * 2000 - 1000,
                    y: Math.random() * 2000 - 1000,
                    z: Math.random() * 1000,
                });
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const animate = () => {
            ctx.fillStyle = "#0B0B0F"; // Match app background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach((star) => {
                star.z -= speed * 20;

                if (star.z <= 0) {
                    star.x = Math.random() * 2000 - 1000;
                    star.y = Math.random() * 2000 - 1000;
                    star.z = 1000;
                }

                const x = (star.x / star.z) * canvas.width + cx;
                const y = (star.y / star.z) * canvas.height + cy;
                const size = (1 - star.z / 1000) * 2.5;
                const opacity = (1 - star.z / 1000);

                if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        initStars();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [speed, starCount]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
