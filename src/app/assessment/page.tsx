'use client';

import { useState, useRef } from "react";
import { ArrowRight, Upload, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function StartAssessment() {
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    startup_name: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith('.pdf')) {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }
    setFile(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !form.name || !form.email) {
      toast({
        title: "Information required",
        description: "Please fill all fields and upload your pitch deck.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', form.name);
      formData.append('email', form.email);
      // Optional startup name mapped to our backend 'company' field 
      if (form.startup_name) {
        formData.append('company', form.startup_name);
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      toast({
        title: "Redirecting...",
        description: "Taking you to secure checkout.",
      });

      if (data.url) {
        router.push(data.url);
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Submission failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="font-display text-xl text-foreground">
            PitchDeck Analyzer
          </a>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl text-foreground mb-3 font-semibold">
              Start Your Assessment
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Upload your pitch deck and tell us about your startup. We'll
              deliver a comprehensive investor-lens PDF review.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border p-8 shadow-lg space-y-5"
          >
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@startup.com"
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Startup Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="startup_name"
                className="text-sm font-medium text-foreground"
              >
                Startup Name
              </label>
              <input
                id="startup_name"
                name="startup_name"
                type="text"
                value={form.startup_name}
                onChange={handleChange}
                placeholder="Acme Inc."
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Pitch Deck (PDF)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {!file ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`w-full h-28 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors duration-200 cursor-pointer ${
                    isDragActive 
                      ? 'border-primary text-primary bg-primary/5' 
                      : 'border-input bg-muted/30 text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  <Upload size={22} />
                  <span className="text-sm font-medium">
                    Click or drop PDF here
                  </span>
                  <span className="text-xs">Max 20 MB</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-input bg-muted/30 px-4 py-3">
                  <FileText size={20} className="text-accent shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? "Processing Checkout..." : "Unlock AI Analysis ($49)"}
              {!submitting && <ArrowRight size={16} />}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Payment is required before report generation. Secure payment powered by Stripe.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
