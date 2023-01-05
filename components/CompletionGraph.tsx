'use client';

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function CompletionGraph({ data }: { data: number[]; }) {
    const canvasEl = useRef(null);

    const colors = {
        purple: {
            default: "rgba(149, 76, 233, 1)",
            half: "rgba(149, 76, 233, 0.5)",
            quarter: "rgba(149, 76, 233, 0.25)",
            zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    };

    useEffect(() => {
        const ctx = (canvasEl.current as any).getContext("2d");
        // const ctx = document.getElementById("myChart");

        const gradient = ctx.createLinearGradient(0, 16, 0, 600);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.65, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        // const data = [12, 19, 3, 5, 2, 3];

        const myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((d, i) => `Day ${i + 1}`),
                datasets: [{
                    label: 'Current Streak',
                    data,
                    fill: false,
                    tension: 0.1,
                    borderWidth: 1,
                    cubicInterpolationMode: 'default',
                    pointStyle: '',
                }],
            },
            options: {
                scales: {
                    y: {
                        display: false,
                        beginAtZero: true

                    },
                    x: {
                        // display: false,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    }
                },
            }
        });

        return function cleanup() {
            myLineChart.destroy();
        };
    });

    return (
        <div className="App">
            <canvas id="myChart" ref={canvasEl} height="200" />
        </div>
    );
}
