'use client';

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 mt-6 mb-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
            <span className="text-lg">/</span>
            <span className="text-lg">Subscription</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">3 Articles left (15 tokens)</span>
            <Button variant="outline" className="border-2 border-gray-800 hover:bg-gray-100">
              Upgrade Plan
            </Button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Create Content
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 mb-20 bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-8">
          <p className="text-purple-700 text-lg font-semibold mb-2">
            Start your subscription and create 10 Articles each month. You will be able to purchase more Articles any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <Card className="p-8 bg-white">
            <h2 className="text-2xl font-medium mb-2">Free Plan</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-semibold">$0</span>
              <span className="text-gray-600 ml-2">/ month</span>
            </div>
            <p className="text-gray-600 mb-6">
              The free plan allows you to write 3 articles and test the capabilities of Copymate.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Articles</span>
                <span>3 one time</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects</span>
                <span>Unlimited</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wordpress integrations</span>
                <span>Unlimited</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-4</span>
                <span>Yes</span>
              </div>
            </div>

            <div className="flex items-center justify-center text-green-600 gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>This plan is active.</span>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 bg-white border-2 border-purple-600">
            <h2 className="text-2xl font-medium mb-2">Professional Plan</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-semibold">$99.99</span>
              <span className="text-gray-600 ml-2">/ month</span>
            </div>
            <p className="text-gray-600 mb-6">
              Start creating SEO optimized and user friendly content without any limitations.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Articles</span>
                <span>25 per month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects</span>
                <span>Unlimited</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wordpress integrations</span>
                <span>Unlimited</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-4</span>
                <span>Yes</span>
              </div>
            </div>

            <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Upgrade Plan
            </button>
          </Card>
        </div>

        {/* Purchase Tokens Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-medium mb-4">Purchase tokens</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Do you have a bigger demand for content? No problem, purchase more tokens and keep writing.
          </p>

          {/* Info Banner */}
          <div className="mt-14 mb-20 bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-8">
            <p className="text-purple-700 text-lg font-bold">
              You need an active subscription in order to have the option to buy additional tokens.
            </p>
          </div>

          {/* Token Packages */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 10 Articles Package */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium">10 Articles (50 tokens)</h3>
                <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm">-20%</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl line-through text-gray-400">$29</span>
                <span className="text-4xl font-semibold">$26</span>
              </div>
              <p className="text-gray-600 mb-6">You can use any model to create articles.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Articles</span>
                  <span>10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tokens</span>
                  <span>50</span>
                </div>
              </div>

              <button className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                Purchase 10 Articles
              </button>
            </div>

            {/* 36 Articles Package */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium">36 Articles (180 tokens)</h3>
                <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm">-30%</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl line-through text-gray-400">$99</span>
                <span className="text-4xl font-semibold">$53</span>
              </div>
              <p className="text-gray-600 mb-6">You can use any model to create articles.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Articles</span>
                  <span>36</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tokens</span>
                  <span>180</span>
                </div>
              </div>

              <button className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                Purchase 36 Articles
              </button>
            </div>

            {/* 100 Articles Package */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium">100 Articles (500 tokens)</h3>
                <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm">-40%</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl line-through text-gray-400">$250</span>
                <span className="text-4xl font-semibold">$175</span>
              </div>
              <p className="text-gray-600 mb-6">You can use any model to create articles.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Articles</span>
                  <span>100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tokens</span>
                  <span>500</span>
                </div>
              </div>

              <button className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                Purchase 100 Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
