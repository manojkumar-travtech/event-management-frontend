"use client";

import React, { useRef, useState } from "react";

import { Typography } from "../Typography";

export default function MultiStepFormExample() {

  return (<div className="max-w-4xl mx-auto p-8 space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-12">
        <Typography variant="display" size="2xl" weight="bold" as="h1" color="#1e40af">
          Typography Component Demo
        </Typography>
        <Typography variant="text" size="lg" color="#64748b" as="p">
          2xl on desktop → lg on mobile | Resize to see the scaling
        </Typography>
      </div>

      {/* Display Variants */}
      <section className="bg-white rounded-lg p-6 shadow-sm border">
        <Typography variant="text" size="xl" weight="semibold" as="h2" className="mb-6 text-gray-800">
          Display Variants (Responsive)
        </Typography>
        
        <div className="space-y-4">
          <div>
            <Typography variant="display" size="2xl" weight="bold" as="h1" color="#dc2626">
              Display 2XL → LG on Mobile
            </Typography>
            <Typography variant="text" size="sm" color="#6b7280" className="mt-1">
              Desktop: 6xl → Mobile: lg (aggressive scaling for headlines)
            </Typography>
          </div>
          
          <div>
            <Typography variant="display" size="xl" weight="semibold" as="h2" color="#ea580c">
              Display XL → BASE on Mobile
            </Typography>
            <Typography variant="text" size="sm" color="#6b7280" className="mt-1">
              Desktop: 5xl → Mobile: base (scales down significantly)
            </Typography>
          </div>
          
          <div>
            <Typography variant="display" size="lg" weight="medium" as="h3" color="#d97706">
              Display LG → BASE on Mobile
            </Typography>
            <Typography variant="text" size="sm" color="#6b7280" className="mt-1">
              Desktop: 4xl → Mobile: base (maintains readability)
            </Typography>
          </div>
        </div>
      </section>

      {/* Text Variants */}
      <section className="bg-white rounded-lg p-6 shadow-sm border">
        <Typography variant="text" size="xl" weight="semibold" as="h2" className="mb-6 text-gray-800">
          Text Variants (Responsive)
        </Typography>
        
        <div className="space-y-4">
          <div>
            <Typography variant="text" size="2xl" weight="bold" as="p" color="#059669">
              Text 2XL → SM on Mobile
            </Typography>
            <Typography variant="text" size="md" color="#6b7280" className="mt-2">
              Desktop: 2xl → Mobile: sm. Perfect scaling for large text that needs to remain readable on small screens.
            </Typography>
          </div>
          
          <div>
            <Typography variant="text" size="xl" weight="semibold" as="p" color="#0891b2">
              Text XL → SM on Mobile
            </Typography>
            <Typography variant="text" size="md" color="#6b7280" className="mt-2">
              Desktop: xl → Mobile: sm. Great balance between prominence and mobile readability.
            </Typography>
          </div>
          
          <div>
            <Typography variant="text" size="lg" weight="medium" as="p" color="#7c3aed">
              Text LG → XS on Mobile
            </Typography>
            <Typography variant="text" size="md" color="#6b7280" className="mt-2">
              Desktop: lg → Mobile: xs. Scales down significantly while maintaining legibility.
            </Typography>
          </div>
          
          <div>
            <Typography variant="text" size="md" as="p" color="#374151">
              Text MD → XS on Mobile
            </Typography>
            <Typography variant="text" size="md" color="#6b7280" className="mt-2">
              Desktop: base → Mobile: xs. Standard body text with appropriate mobile scaling.
            </Typography>
          </div>
          
          <div>
            <Typography variant="text" size="sm" color="#6b7280" as="p">
              Text SM → XS on Mobile. Smaller text that scales down to extra small on mobile devices.
            </Typography>
          </div>
          
          <div>
            <Typography variant="text" size="xs" color="#9ca3af" as="p">
              Text XS → Stays XS. Already optimized for small screens.
            </Typography>
          </div>
        </div>
      </section>

      {/* Weight Examples */}
      <section className="bg-white rounded-lg p-6 shadow-sm border">
        <Typography variant="text" size="xl" weight="semibold" as="h2" className="mb-6 text-gray-800">
          Font Weight Examples
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography variant="text" size="lg" weight="regular" as="p">
              Regular Weight Text
            </Typography>
            <Typography variant="text" size="lg" weight="medium" as="p">
              Medium Weight Text
            </Typography>
            <Typography variant="text" size="lg" weight="semibold" as="p">
              Semibold Weight Text
            </Typography>
            <Typography variant="text" size="lg" weight="bold" as="p">
              Bold Weight Text
            </Typography>
          </div>
          <div>
            <Typography variant="display" size="md" weight="regular" as="h3">
              Regular Display
            </Typography>
            <Typography variant="display" size="md" weight="medium" as="h3">
              Medium Display
            </Typography>
            <Typography variant="display" size="md" weight="semibold" as="h3">
              Semibold Display
            </Typography>
            <Typography variant="display" size="md" weight="bold" as="h3">
              Bold Display
            </Typography>
          </div>
        </div>
      </section>

      {/* Semantic HTML Elements */}
      <section className="bg-white rounded-lg p-6 shadow-sm border">
        <Typography variant="text" size="xl" weight="semibold" as="h2" className="mb-6 text-gray-800">
          Semantic HTML Elements
        </Typography>
        
        <div className="space-y-4">
          <Typography variant="text" size="md" as="p">
            This paragraph contains various inline elements: 
            <Typography variant="text" size="md" weight="bold" as="strong" className="mx-1">
              strong text
            </Typography>
            and
            <Typography variant="text" size="md" as="em" className="mx-1 italic">
              emphasized text
            </Typography>
            and
            <Typography variant="text" size="sm" as="small" className="mx-1">
              small text
            </Typography>
            and even
            <Typography variant="text" size="md" as="mark" className="mx-1 bg-yellow-200 px-1">
              highlighted text
            </Typography>.
          </Typography>
          
          <Typography variant="text" size="md" as="p">
            You can also use 
            <Typography variant="text" size="md" as="del" className="line-through">
              deleted text
            </Typography>
            and 
            <Typography variant="text" size="md" as="ins" className="underline">
              inserted text
            </Typography>.
          </Typography>
          
          <Typography variant="text" size="md" as="p">
            Mathematical expressions: H
            <Typography variant="text" size="sm" as="sub">
              2
            </Typography>
            O and E=mc
            <Typography variant="text" size="sm" as="sup">
              2
            </Typography>
          </Typography>
        </div>
      </section>

      {/* Non-responsive Example */}
      <section className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
        <Typography variant="text" size="xl" weight="semibold" as="h2" className="mb-4 text-gray-800">
          Non-Responsive Example
        </Typography>
        
        <Typography variant="display" size="xl" weight="bold" responsive={false} as="h3" color="#dc2626">
          This heading won't scale on smaller screens
        </Typography>
        <Typography variant="text" size="md" color="#6b7280" className="mt-2">
          Notice how the heading above maintains its size regardless of screen size, while all other text on this page scales responsively.
        </Typography>
      </section>

      {/* Custom Styling */}
      <section className="bg-white rounded-lg p-6 shadow-sm border">
        <Typography variant="text" size="xl" weight="semibold" as="h2" className="mb-6 text-gray-800">
          Custom Styling Examples
        </Typography>
        
        <div className="space-y-4">
          <Typography 
            variant="display" 
            size="lg" 
            weight="bold" 
            as="h3"
            className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Gradient Text Effect
          </Typography>
          
          <Typography 
            variant="text" 
            size="lg" 
            as="p"
            className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-2"
          >
            Text with custom border and background styling
          </Typography>
          
          <Typography 
            variant="text" 
            size="md" 
            weight="medium"
            as="p"
            className="text-center p-4 rounded-lg bg-green-100 text-green-800 border border-green-200"
          >
            Centered text with success styling
          </Typography>
        </div>
      </section>

      {/* Form Labels Example */}
      <section className="bg-white rounded-lg p-6 shadow-sm border">
        <Typography variant="text" size="xl" weight="semibold" as="h2" className="mb-6 text-gray-800">
          Form Integration
        </Typography>
        
        <div className="space-y-4 max-w-md">
          <div>
            <Typography variant="text" size="sm" weight="medium" as="label" className="block mb-2 text-gray-700">
              Email Address
            </Typography>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <Typography variant="text" size="sm" weight="medium" as="label" className="block mb-2 text-gray-700">
              Message
            </Typography>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter your message"
            />
            <Typography variant="text" size="xs" color="#6b7280" className="mt-1">
              Maximum 500 characters
            </Typography>
          </div>
        </div>
      </section>
    </div>
  );
};

