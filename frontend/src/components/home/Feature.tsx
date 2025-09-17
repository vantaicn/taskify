import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Visual Kanban Board",
    description: "Organize tasks with an intuitive drag-and-drop interface, simple like Trello but more powerful.",
    icon: "📋"
  },
  {
    title: "Team Collaboration",
    description: "Work together with your team in real time. Share, discuss, and update progress instantly.",
    icon: "👥"
  },
  {
    title: "Progress Tracking",
    description: "Charts and detailed reports help you keep track of project status and team performance.",
    icon: "📊"
  },
  {
    title: "Automation",
    description: "Set up automation rules to move cards, assign tasks, and send notifications.",
    icon: "⚡"
  },
  {
    title: "Multi-Platform Integration",
    description: "Connect with your favorite tools like Slack, Google Drive, and over 100+ other apps.",
    icon: "🔗"
  },
  {
    title: "High Security",
    description: "Your data is encrypted and protected with the industry’s highest security standards.",
    icon: "🔒"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Key Features of <span className="text-primary">Taskify</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All the tools you need to manage projects effectively and boost productivity
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-hero transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
