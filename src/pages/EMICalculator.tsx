import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import AnimatedPageBanner from "@/components/AnimatedPageBanner";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emiCalc = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiCalc * n;
    return {
      emi: Math.round(emiCalc),
      totalInterest: Math.round(totalPay - P),
      totalPayment: Math.round(totalPay),
    };
  }, [loanAmount, interestRate, tenure]);

  const chartData = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: totalInterest },
  ];
  const COLORS = ["hsl(40, 56%, 56%)", "hsl(0, 0%, 25%)"];

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <Layout>
      <section className="relative pt-32 pb-20 bg-dark">
        <AnimatedPageBanner />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">Financial Tools</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-4">Loan EMI Calculator</h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">Plan your home loan with our easy-to-use EMI calculator.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Inputs */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-md space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-card-foreground">Loan Amount</label>
                  <span className="text-sm font-semibold text-gold">{formatCurrency(loanAmount)}</span>
                </div>
                <Slider value={[loanAmount]} onValueChange={(v) => setLoanAmount(v[0])} min={500000} max={50000000} step={100000} className="[&_[role=slider]]:bg-primary" />
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-card-foreground">Interest Rate</label>
                  <span className="text-sm font-semibold text-gold">{interestRate}%</span>
                </div>
                <Slider value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} min={5} max={20} step={0.1} className="[&_[role=slider]]:bg-primary" />
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-card-foreground">Loan Tenure (Years)</label>
                  <span className="text-sm font-semibold text-gold">{tenure} Years</span>
                </div>
                <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={30} step={1} className="[&_[role=slider]]:bg-primary" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
                  <p className="font-display text-lg font-bold text-gold">{formatCurrency(emi)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                  <p className="font-display text-lg font-bold text-card-foreground">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
                  <p className="font-display text-lg font-bold text-card-foreground">{formatCurrency(totalPayment)}</p>
                </div>
              </div>
            </motion.div>

            {/* Chart */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-md flex items-center justify-center">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={80} outerRadius={130} paddingAngle={3} dataKey="value">
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EMICalculator;
