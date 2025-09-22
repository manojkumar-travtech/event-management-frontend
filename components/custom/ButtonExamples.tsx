"use client";
import React, { useState } from "react";
import {
  Trash2,
  Download,
  Settings,
  Heart,
  ExternalLink,
  ArrowRight,
  Mail,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ButtonShowcase = () => {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Button Component Showcase
        </h1>
        <p className="text-gray-600 mb-8">
          Demonstrating all variants, sizes, and states with the{" "}
          <code>isDestructive</code> prop
        </p>

        {/* Variants Section */}
        <Section title="Button Variants">
          <div className="grid grid-cols-2 gap-4">
            <VariantGroup name="Primary">
              <Button variant="primary">Primary</Button>
              <Button variant="primary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Secondary">
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Secondary Gray">
              <Button variant="secondary-gray">Secondary Gray</Button>
              <Button variant="secondary-gray" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Tertiary">
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="tertiary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Tertiary Gray">
              <Button variant="tertiary-gray">Tertiary Gray</Button>
              <Button variant="tertiary-gray" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Ghost">
              <Button variant="ghost">Ghost</Button>
              <Button variant="ghost" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Link">
              <Button variant="link">Link Button</Button>
              <Button variant="link" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Link Gray">
              <Button variant="link-gray">Link Gray</Button>
              <Button variant="link-gray" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Destructive (Base)">
              <Button variant="destructive">Destructive</Button>
              <Button variant="destructive" isDestructive>
                With Prop
              </Button>
            </VariantGroup>
          </div>
        </Section>

        {/* Sizes Section */}
        <Section title="Button Sizes">
          <div className="flex flex-wrap items-end gap-4">
            <VariantGroup name="Small (sm)">
              <Button size="sm" variant="primary">
                Small
              </Button>
              <Button size="sm" variant="primary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Medium (md)">
              <Button size="md" variant="primary">
                Medium
              </Button>
              <Button size="md" variant="primary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="Large (lg)">
              <Button size="lg" variant="primary">
                Large
              </Button>
              <Button size="lg" variant="primary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="X-Large (xl)">
              <Button size="xl" variant="primary">
                X-Large
              </Button>
              <Button size="xl" variant="primary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>

            <VariantGroup name="2X-Large (2xl)">
              <Button size="2xl" variant="primary">
                2X-Large
              </Button>
              <Button size="2xl" variant="primary" isDestructive>
                Destructive
              </Button>
            </VariantGroup>
          </div>
        </Section>

        {/* With Icons Section */}
        <Section title="Buttons with Icons">
          <div className="grid grid-cols-2 gap-4">
            <VariantGroup name="Left Icon">
              <Button icon={<Download />} iconPosition="left">
                Download
              </Button>
              <Button icon={<Trash2 />} iconPosition="left" isDestructive>
                Delete
              </Button>
            </VariantGroup>

            <VariantGroup name="Right Icon">
              <Button icon={<ArrowRight />} iconPosition="right">
                Continue
              </Button>
              <Button icon={<Trash2 />} iconPosition="right" isDestructive>
                Remove
              </Button>
            </VariantGroup>

            <VariantGroup name="Icon Only">
              <Button icon={<Settings />} aria-label="Settings" />
              <Button icon={<Trash2 />} isDestructive aria-label="Delete" />
            </VariantGroup>

            <VariantGroup name="Both Icons">
              <Button icon={<Mail />} iconPosition="left" variant="secondary">
                Message
              </Button>
              <Button
                icon={<Trash2 />}
                iconPosition="left"
                isDestructive
                variant="secondary"
              >
                Discard
              </Button>
            </VariantGroup>
          </div>
        </Section>

        {/* States Section */}
        <Section title="Button States">
          <div className="grid grid-cols-2 gap-4">
            <VariantGroup name="Loading State">
              <Button isLoading variant="primary">
                Loading
              </Button>
              <Button isLoading isDestructive variant="primary">
                Loading
              </Button>
            </VariantGroup>

            <VariantGroup name="Disabled State">
              <Button disabled variant="primary">
                Disabled
              </Button>
              <Button disabled isDestructive variant="primary">
                Disabled
              </Button>
            </VariantGroup>

            <VariantGroup name="Interactive Loading">
              <Button
                isLoading={isLoading}
                onClick={simulateLoading}
                variant="primary"
              >
                Click to Load
              </Button>
              <Button
                isLoading={isLoading}
                onClick={simulateLoading}
                isDestructive
                variant="primary"
              >
                Destructive Load
              </Button>
            </VariantGroup>
          </div>
        </Section>

        {/* Real-world Examples */}
        <Section title="Real-world Examples">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4">User Actions</h3>
              <div className="space-y-3">
                <Button icon={<Heart />} variant="primary">
                  Add to Favorites
                </Button>
                <Button icon={<Settings />} variant="secondary">
                  Settings
                </Button>
                <Button icon={<ExternalLink />} variant="ghost">
                  Open in New Tab
                </Button>
                <Button icon={<Trash2 />} isDestructive variant="primary">
                  Delete Account
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4">Form Actions</h3>
              <div className="space-y-3">
                <Button variant="primary">Save Changes</Button>
                <Button variant="secondary">Cancel</Button>
                <Button variant="secondary-gray">Reset Form</Button>
                <Button isDestructive variant="tertiary">
                  Clear All Data
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4">Navigation</h3>
              <div className="space-y-3">
                <Button variant="link">View All Products</Button>
                <Button variant="link-gray">Terms of Service</Button>
                <Button
                  icon={<ArrowRight />}
                  iconPosition="right"
                  variant="link"
                >
                  Continue Reading
                </Button>
                <Button isDestructive variant="link">
                  Cancel Subscription
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4">
                Status Indicators
              </h3>
              <div className="space-y-3">
                <Button isLoading variant="primary">
                  Processing...
                </Button>
                <Button disabled variant="secondary">
                  Inactive Option
                </Button>
                <Button icon={<Star />} variant="tertiary">
                  Featured Item
                </Button>
                <Button isDestructive disabled variant="primary">
                  Cannot Delete
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

// Helper components for organization
const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
      {title}
    </h2>
    {children}
  </div>
);

const VariantGroup = ({ name, children }) => (
  <div className="mb-6">
    <h3 className="font-medium text-gray-700 mb-3">{name}</h3>
    <div className="flex flex-wrap gap-3">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="flex flex-col items-center">
          {child}
          <div className="text-xs text-gray-500 mt-2">
            {React.Children.toArray(children)[index].props.isDestructive
              ? "Destructive"
              : "Normal"}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ButtonShowcase;
