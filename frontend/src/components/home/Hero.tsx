import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handlePrimaryAction = () => {
    if (user) {
      navigate('/boards');
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="min-h-screen bg-bg-gradient flex items-center">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Manage your work effectively with
              <span className="bg-hero-gradient bg-clip-text text-primary">
                {" "}
                Taskify{" "}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Organize, track, and complete every task with ease. Taskify helps
              you and your team work smarter, not harder.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
              onClick={handlePrimaryAction}
            >
              {user ? "Go to Boards" : "Get Started Free"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              View Demo
            </Button>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl"></div>
          <img
            src={heroIllustration}
            alt="Taskify Dashboard Preview"
            className="relative z-10 w-full h-auto rounded-2xl shadow-hero"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
