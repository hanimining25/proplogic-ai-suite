
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, FileText, FlaskConical, Layers, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-background/70 backdrop-blur-md sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gradient">PropLogic AI</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-foreground/80 hover:text-foreground">Features</a>
            <a href="#benefits" className="text-foreground/80 hover:text-foreground">Benefits</a>
            <a href="#workflow" className="text-foreground/80 hover:text-foreground">Workflow</a>
          </nav>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>Demo</Button>
            <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="spotlight left-1/2 top-1/2 animate-spotlight bg-proplogic-purple/30" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 max-w-4xl animate-fade-in">
          <span className="text-gradient">Intelligent</span> Proposal Management & CRM Platform
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
          An AI-first, multi-tenant SaaS platform for managing complex proposal and RFP processes end-to-end.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in [animation-delay:400ms]">
          <Button size="lg" onClick={() => navigate("/dashboard")}>
            Explore Dashboard
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/rfps")}>
            View RFP Management
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-lg p-6 border shadow-sm animate-fade-in hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CRM Module</h3>
              <p className="text-muted-foreground">
                Comprehensive client management with contacts, history, and health scoring to nurture relationships.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card rounded-lg p-6 border shadow-sm animate-fade-in [animation-delay:100ms] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">RFP Management</h3>
              <p className="text-muted-foreground">
                Automated discovery, analysis and processing of RFPs with intelligent relevance scoring.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card rounded-lg p-6 border shadow-sm animate-fade-in [animation-delay:200ms] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proposal Generation</h3>
              <p className="text-muted-foreground">
                AI-assisted creation of technical and commercial proposals with templates and reusable components.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-card rounded-lg p-6 border shadow-sm animate-fade-in [animation-delay:300ms] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FlaskConical className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Features</h3>
              <p className="text-muted-foreground">
                Intelligent workflows, document analysis, and predictive analytics to enhance decision making.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-card rounded-lg p-6 border shadow-sm animate-fade-in [animation-delay:400ms] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Reporting</h3>
              <p className="text-muted-foreground">
                Comprehensive dashboards and win/loss analytics to continuously improve success rates.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-card rounded-lg p-6 border shadow-sm animate-fade-in [animation-delay:500ms] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Workflow Automation</h3>
              <p className="text-muted-foreground">
                Streamlined approval processes and notifications to ensure timely completion of tasks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">40–60% Faster Delivery</h3>
                  <p className="text-muted-foreground">
                    Reduce the time spent on proposal creation through AI automation and reusable components.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">25–30% Higher Win Rates</h3>
                  <p className="text-muted-foreground">
                    Improve proposal quality and targeting with AI insights and continuous learning.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Centralized Insight</h3>
                  <p className="text-muted-foreground">
                    Gain comprehensive visibility into your proposal pipeline and client relationships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Lower Workload</h3>
                  <p className="text-muted-foreground">
                    Reduce manual effort through intelligent automation of repetitive tasks.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 to-secondary/10 p-8 rounded-lg shadow-lg border border-white/10">
              <div className="relative h-64 md:h-80 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-primary/30 rounded-full filter blur-3xl animate-pulse-glow"></div>
                </div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold mb-3 text-gradient">AI-Powered</div>
                  <div className="text-2xl font-medium mb-6">Proposal Management</div>
                  <Button onClick={() => navigate("/dashboard")}>
                    Try Dashboard Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Workflow Section */}
      <section id="workflow" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Workflow Automation</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Step flow line */}
              <div className="absolute left-8 top-10 bottom-10 w-1 bg-primary/30"></div>
              
              {/* Step 1 */}
              <div className="flex mb-12 relative animate-fade-in">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <div className="ml-6 pt-2">
                  <h3 className="text-xl font-semibold mb-2">RFP Discovery</h3>
                  <p className="text-muted-foreground">
                    RFPs are automatically fetched from Etimad or uploaded manually, then analyzed by AI for relevance.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex mb-12 relative animate-fade-in [animation-delay:100ms]">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <div className="ml-6 pt-2">
                  <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    AI analyzes the scope of work, identifies risks, and suggests pricing strategies.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex mb-12 relative animate-fade-in [animation-delay:200ms]">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <div className="ml-6 pt-2">
                  <h3 className="text-xl font-semibold mb-2">Proposal Generation</h3>
                  <p className="text-muted-foreground">
                    Technical and commercial proposals are generated using AI and templates from your library.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex mb-12 relative animate-fade-in [animation-delay:300ms]">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-primary">4</span>
                </div>
                <div className="ml-6 pt-2">
                  <h3 className="text-xl font-semibold mb-2">Approval & Submission</h3>
                  <p className="text-muted-foreground">
                    Automated approval workflows ensure quality control before proposals are finalized and submitted.
                  </p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="flex relative animate-fade-in [animation-delay:400ms]">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-primary">5</span>
                </div>
                <div className="ml-6 pt-2">
                  <h3 className="text-xl font-semibold mb-2">Learning & Analytics</h3>
                  <p className="text-muted-foreground">
                    Feedback is logged, and AI continuously improves by learning from past proposals and outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Proposal Process?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your proposal management and increase your win rates with our AI-powered platform.
          </p>
          <Button size="lg" onClick={() => navigate("/dashboard")}>
            Explore the Demo
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-10 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-gradient mb-4 md:mb-0">PropLogic AI</div>
            <div className="text-sm text-muted-foreground">
              © 2025 PropLogic AI Suite. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
