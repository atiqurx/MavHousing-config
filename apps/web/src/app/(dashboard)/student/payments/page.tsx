"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard, Banknote, Building2, CheckCircle,
  AlertCircle, Clock, DollarSign, Loader2, Receipt
} from "lucide-react";

const PAYMENT_METHODS = [
  { value: "CREDIT_CARD", label: "Credit Card", icon: "💳" },
  { value: "DEBIT_CARD", label: "Debit Card", icon: "💳" },
  { value: "BANK_TRANSFER", label: "Bank Transfer (ACH)", icon: "🏦" },
  { value: "CHECK", label: "Check", icon: "📄" },
  { value: "CASH", label: "Cash", icon: "💵" },
];

const METHOD_ICONS: Record<string, React.ReactNode> = {
  CREDIT_CARD: <CreditCard className="h-4 w-4" />,
  DEBIT_CARD: <CreditCard className="h-4 w-4" />,
  BANK_TRANSFER: <Building2 className="h-4 w-4" />,
  CHECK: <Receipt className="h-4 w-4" />,
  CASH: <Banknote className="h-4 w-4" />,
};

interface PaymentSummary {
  totalDue: number;
  totalPaid: number;
  balance: number;
  dueThisMonth: number;
  paymentCount: number;
  lease: {
    leaseId: number;
    startDate: string;
    endDate: string;
    unit?: { unitNumber: string; property: { name: string; address: string } };
  };
}

interface Payment {
  paymentId: number;
  amountPaid: string;
  method: string;
  transactionDate: string;
  isSuccessful: boolean;
}

function formatMoney(val: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatShortDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("CREDIT_CARD");
  const [paying, setPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState<Payment | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.userId) fetchAll();
  }, [user]);

  async function fetchAll() {
    setLoading(true);
    try {
      const [sumRes, payRes] = await Promise.all([
        fetch(`http://localhost:3009/payment/summary?userId=${user!.userId}`),
        fetch(`http://localhost:3009/payment/my-payments?userId=${user!.userId}`),
      ]);
      const sumData = await sumRes.json();
      const payData = await payRes.json();
      setSummary(sumData);
      setPayments(Array.isArray(payData) ? payData : []);
      // Pre-fill amount with monthly due
      if (sumData?.dueThisMonth) setAmount(String(sumData.dueThisMonth));
    } finally {
      setLoading(false);
    }
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) { setError("Please enter a valid amount."); return; }
    setError("");
    setPaying(true);
    try {
      const res = await fetch("http://localhost:3009/payment/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user!.userId, amount: parseFloat(amount), method }),
      });
      const data = await res.json();
      setPaySuccess(data);
      // Refresh data
      await fetchAll();
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Loading payments...</div>;
  }

  if (!summary) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center mt-12">
        <AlertCircle className="mx-auto h-10 w-10 text-yellow-500 mb-3" />
        <h2 className="text-xl font-semibold mb-2">No Active Lease</h2>
        <p className="text-muted-foreground">You need an active lease to view payment information.</p>
      </div>
    );
  }

  const balancePct = Math.min(100, (summary.totalPaid / summary.totalDue) * 100);
  const isOverdue = summary.balance > 0;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><DollarSign className="h-6 w-6 text-primary" /> Payments</h1>
        <p className="text-muted-foreground">Manage your monthly housing payments</p>
      </div>

      {/* Success Banner */}
      {paySuccess && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-800">Payment Successful!</p>
            <p className="text-sm text-green-700">
              {formatMoney(Number(paySuccess.amountPaid))} paid via {paySuccess.method?.replace("_", " ")} on {formatShortDate(paySuccess.transactionDate)}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto text-green-700" onClick={() => setPaySuccess(null)}>✕</Button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Balance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" /> Balance Summary
            </CardTitle>
            {summary.lease.unit && (
              <CardDescription>
                {summary.lease.unit.property.name} · Unit {summary.lease.unit.unitNumber}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Due (Lease)</span>
              <span className="font-semibold">{formatMoney(summary.totalDue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Paid</span>
              <span className="font-semibold text-green-600">{formatMoney(summary.totalPaid)}</span>
            </div>
            {/* Progress bar */}
            <div className="space-y-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${balancePct}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{balancePct.toFixed(0)}% of lease paid</p>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Remaining Balance</span>
              <span className={`text-xl font-bold ${isOverdue ? "text-red-600" : "text-green-600"}`}>
                {formatMoney(summary.balance)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Due This Month
              </span>
              <span className="font-semibold">{formatMoney(summary.dueThisMonth)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Make a Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Make a Payment
            </CardTitle>
            <CardDescription>Simulated — no real charges are made</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Enter amount..."
                />
                <div className="flex gap-2 flex-wrap">
                  {[summary.dueThisMonth, summary.balance].filter((v, i, arr) => v > 0 && arr.indexOf(v) === i).map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(String(preset))}
                      className="text-xs px-2 py-1 rounded border border-border hover:bg-muted transition-colors"
                    >
                      {formatMoney(preset)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map(m => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.icon} {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={paying}>
                {paying ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                  `Pay ${amount ? formatMoney(parseFloat(amount)) : "Amount"}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" /> Payment History
          </CardTitle>
          <CardDescription>{payments.length} payment{payments.length !== 1 ? "s" : ""} recorded</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No payments recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {payments.map(p => (
                <div key={p.paymentId} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center h-9 w-9 rounded-full ${p.isSuccessful ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {METHOD_ICONS[p.method] ?? <CreditCard className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{p.method.replace("_", " ")}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(p.transactionDate)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+{formatMoney(Number(p.amountPaid))}</p>
                    <Badge variant={p.isSuccessful ? "outline" : "destructive"} className="text-xs mt-0.5">
                      {p.isSuccessful ? "✓ Successful" : "✕ Failed"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
