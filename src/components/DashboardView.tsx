import { Calendar, Users, FileCheck, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const DashboardView = () => {
  const departments = [
    {
      name: "Legal Department",
      rfps: 3,
      pending: 2,
      color: "bg-blue-100 text-blue-800",
      tasks: [
        { title: "Contract Terms Review", deadline: "2024-01-15", priority: "high" },
        { title: "Compliance Assessment", deadline: "2024-01-18", priority: "medium" }
      ]
    },
    {
      name: "Finance Department",
      rfps: 5,
      pending: 1,
      color: "bg-green-100 text-green-800",
      tasks: [
        { title: "Budget Analysis", deadline: "2024-01-12", priority: "high" },
        { title: "Cost Evaluation", deadline: "2024-01-20", priority: "low" }
      ]
    },
    {
      name: "Technical Department",
      rfps: 4,
      pending: 3,
      color: "bg-purple-100 text-purple-800",
      tasks: [
        { title: "Technical Specifications", deadline: "2024-01-14", priority: "high" },
        { title: "Infrastructure Assessment", deadline: "2024-01-16", priority: "medium" }
      ]
    }
  ];

  const recentRFPs = [
    {
      title: "Digital Transformation Initiative",
      status: "In Review",
      deadline: "2024-01-25",
      departments: ["Technical", "Finance"],
      priority: "high"
    },
    {
      title: "Security Infrastructure Upgrade",
      status: "Pending Approval",
      deadline: "2024-02-01",
      departments: ["Legal", "Technical"],
      priority: "medium"
    },
    {
      title: "Office Supply Contract",
      status: "Completed",
      deadline: "2024-01-10",
      departments: ["Finance"],
      priority: "low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Active RFPs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Urgent Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Current workload and pending tasks by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept) => (
                <div key={dept.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className={dept.color}>{dept.name}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {dept.rfps} RFPs • {dept.pending} pending
                      </span>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                  <div className="space-y-2">
                    {dept.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{task.title}</span>
                        <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                          <span className="text-muted-foreground">{task.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent RFPs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent RFPs</CardTitle>
            <CardDescription>Latest submitted and processed RFP documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRFPs.map((rfp, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{rfp.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{rfp.status}</Badge>
                        <Badge className={getPriorityColor(rfp.priority)}>
                          {rfp.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{rfp.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{rfp.departments.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};