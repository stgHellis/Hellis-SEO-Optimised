'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProjects, type Project } from "@/store/useProjects";

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isClient, setIsClient] = useState(false);
  const { projects, addProject, removeProject } = useProjects();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreateProject = () => {
    const newProject: Project = {
      name: projectName,
      unpublishedArticles: 0,
      wordpress: false,
      pbn: false,
    };
    
    addProject(newProject);
    setProjectName("");
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {isClient ? (
          <>
            {/* Header Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link href="/dashboard" className="text-purple-600 text-lg hover:text-purple-700">Dashboard</Link>
                <span className="text-lg">/</span>
                <span className="text-lg">Projects</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-semibold">3 Articles left (15 tokens)</span>
                <Link href="/subscription">
                  <Button variant="outline" className="border-2 border-gray-800 hover:bg-purple-200">
                    Upgrade Plan
                  </Button>
                </Link>
                <Link href="/create-content">
                  <Button className="p-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                    Create Content
                  </Button>
                </Link>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 mt-12">Projects</h1>
            <p className="text-gray-600 text-lg mb-8">You have {projects.length} project{projects.length !== 1 ? 's' : ''}</p>

            <div className="flex items-center gap-4 mt-16">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Create New Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-4xl mb-4">Setup Your First Project</DialogTitle>
                    <DialogDescription>
                      Setup your first project name below to get started.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6">
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="bg-gray-50 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                      placeholder="Enter project name"
                    />
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={handleCreateProject}
                      disabled={!projectName.trim()}
                    >
                      Create Project
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search Input */}
            <div className="mt-8 mb-12">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full text-white p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-6 border-b border-gray-100 bg-gray-50">
                <div className="text-lg font-semibold text-gray-600">Project Name</div>
                <div className="text-lg font-semibold text-gray-600">Unpublished Articles</div>
                <div className="text-lg font-semibold text-gray-600">Wordpress</div>
                <div className="text-lg font-semibold text-gray-600">PBN</div>
                <div className="text-lg font-semibold text-gray-600">Delete</div>
              </div>

              {/* Project Rows */}
              {projects.map((project, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 p-6 items-center hover:bg-gray-50">
                  <Link 
                    href={`/articles?project=${project.name}`}
                    className="contents col-span-4 cursor-pointer"
                  >
                    <div className="text-purple-600 text-lg">{project.name}</div>
                    <div>{project.unpublishedArticles}</div>
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
                  </Link>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700"
                      onClick={() => removeProject(index)}
                    >
                      Delete
                    </Button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
