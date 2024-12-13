'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TimePage() {
  const currentTime = "2024-12-13T10:55:16+01:00";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Current Time</h1>
            <p className="text-gray-600">View and track the current time</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Refresh Time
          </button>
        </div>

        <Card className="w-full bg-white">
          <CardHeader>
            <CardTitle>Time Information</CardTitle>
            <CardDescription>Current system time and timezone details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Current Time (ISO Format)</label>
                <div className="mt-2 text-2xl font-mono bg-gray-50 p-4 rounded-lg">
                  {currentTime}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-medium">{currentTime.split('T')[0]}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Time</div>
                  <div className="font-medium">{currentTime.split('T')[1].split('+')[0]}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Timezone</div>
                  <div className="font-medium">+{currentTime.split('+')[1]}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
