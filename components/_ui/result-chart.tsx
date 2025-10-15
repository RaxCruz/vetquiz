"use client"
import { TrendingUp } from "lucide-react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { useRouter } from "next/navigation"
import useSound from "use-sound"
export const description = "A radial chart with a custom shape"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
export function ResultChart({ chartData }: { chartData: any }) {
    const router = useRouter()
    const [playStart] = useSound('/sounds/meow.mp3', {
        volume: 0.25,
    });
    return (
        <Card className="flex flex-col w-full h-screen ">
            <CardHeader className="items-center pb-0">
                <CardTitle>答題結果</CardTitle>
                <CardDescription>Rax analysis</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={36 / 10 * chartData[0].visitors}
                        innerRadius={80}
                        outerRadius={140}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="visitors" background />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-white text-4xl font-bold"
                                                >
                                                    {chartData[0].visitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    分
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
               <div className="relative grid place-content-center space-y-6 p-8">
    <p className="mx-auto text-6xl font-black text-neutral-950 pl-4">
        {chartData[0].visitors >= 80 
            ? "表現得可圈可點！🎉"
            : "這個分數，再加油好嗎？"}
    </p>
    <p className="text-center text-neutral-400">
        此次測驗{chartData[0].visitors >= 80 ? "通過囉，簡直完美 📺！" : "沒過呦，要再認真一點 📺"}
    </p>
    <div className="flex items-center justify-center gap-3">
        <button className="text-neutral-20 w-fit px-4 py-2 font-semibold text-neutral-200 transition-colors hover:bg-neutral-800" 
            onClick={() => alert('®你真細心和認真❤️\n但目前還沒開放呢👀')}>
            題目詳解
        </button>
        <button className="w-fit bg-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50" 
            onClick={() => { playStart(); router.push('/quiz'); }}>
            再挑戰一次
        </button>
    </div>
</div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                   {""}
                </div>
                <div className="leading-none text-muted-foreground">
                    {""}
                </div>
            </CardFooter>
        </Card>
    )
}
