'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="p-8">
      {/* Projects table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-6 border-b border-gray-100 bg-gray-50">
          <div className="text-lg font-semibold text-gray-600">Project Name</div>
          <div className="text-lg font-semibold text-gray-600">Unpublished Articles</div>
          <div className="text-lg font-semibold text-gray-600">Wordpress</div>
          <div className="text-lg font-semibold text-gray-600">PBN</div>
          <div className="text-lg font-semibold text-gray-600">Delete</div>
        </div>

        {/* Project row */}
        <div className="grid grid-cols-5 gap-4 p-6 items-center hover:bg-gray-50">
          <div className="text-purple-600 text-lg">stgHellis</div>
          <div>0</div>
          <div>
            <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
          <div>
            <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
          <div>
            <Button variant="destructive" className="text-white hover:text-red-900">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
