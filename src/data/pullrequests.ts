export interface PullRequest {
    number: number;
    title: string;
    repo: string;
    organization: string;
    description?: string;
    status: "merged" | "open" | "closed";
    date: string;
    labels: string[];
    stats: {
      additions?: number;
      deletions?: number;
      comments?: number;
      files?: number;
    };
    link: string;
  }

export const pullRequests: PullRequest[] = [
    {
      number: 3237,
      title: "Pipeline Helm Charts",
      repo: "kubeflow/manifests",
      organization: "Kubeflow",
      status: "open",
      date: "2025-09",
      labels: ["feature", "helm", "deployment", "kubeflow-pipelines"],
      stats: { additions: 11902, deletions: 15, comments: 7, files: 135 },
      link: "https://github.com/kubeflow/manifests/pull/3237"
    },
    {
      number: 3175,
      title: "Helm Charts Model Registry",
      repo: "kubeflow/manifests",
      organization: "Kubeflow",
      status: "merged",
      date: "2025-06",
      labels: ["feature", "helm", "deployment", "kubeflow-pipelines"],
      stats: { additions: 5456, deletions: 0, comments: 8, files: 52 },
      link: "https://github.com/kubeflow/manifests/pull/3175"
    },
    {
      number: 3168,
      title: " Helm Charts Katib",
      repo: "kubeflow/manifests",
      organization: "Kubeflow",
      status: "open",
      date: "2025-07",
      labels: ["feature", "helm", "deployment", "kubeflow-pipelines"],
      stats: { additions: 5456, deletions: 0, comments: 8, files: 52 },
      link: "https://github.com/kubeflow/manifests/pull/3168"
    },
    {
      number: 57330,
      title: "Add seccompProfile configuration",
      repo: "istio/istio",
      organization: "Istio",
      description: "Add seccompProfile configuration to global proxy values",
      status: "merged",
      date: "2025-08",
      labels: ["enhancement", "istio", "security"],
      stats: { additions: 40, deletions: 0, comments: 25, files: 3 },
      link: "https://github.com/istio/istio/pull/57330"
    },
    {
      number: 3070,
      title: "Add comprehensive Kubeflow integration test GitHub Actions workflow",
      repo: "kubeflow/manifests",
      organization: "Kubeflow",
      status: "merged",
      date: "2025-03",
      labels: ["feature", "ci/cd", "automation"],
      stats: { additions: 284, deletions: 0, comments: 43, files: 1 },
      link: "https://github.com/kubeflow/manifests/pull/3070"
    },
    {
      number: 3077,
      title: "end-to-end integration tests",
      repo: "kubeflow/manifests",
      organization: "Kubeflow",
      status: "merged",
      date: "2025-03",
      labels: ["ci/cd", "testing", "automation"],
      stats: { additions: 353, deletions: 338, comments: 117, files: 24 },
      link: "https://github.com/kubeflow/manifests/pull/3077"
    },
    {
      number: 3115,
      title: "Making the synchronize scripts consistent ",
      repo: "kubeflow/manifests",
      organization: "Kubeflow",
      status: "merged",
      date: "2025-07",
      labels: ["enhancement", "shell scripts", "manifests", "kubeflow"],
      stats: { additions: 552, deletions: 730, comments: 15, files: 13 },
      link: "https://github.com/kubeflow/manifests/pull/3115"
    },
    {
      number: 3093,
      title: "improve the tests with real KF profile namespaces ",
      repo: "kubeflow/manifests",
      organization: "Kubeflow",
      status: "merged",
      date: "2025-03",
      labels: ["enhancement", "testing", "kubeflow", "ci/cd"],
      stats: { additions: 345, deletions: 97, comments: 51, files: 11 },
      link: "https://github.com/kubeflow/manifests/pull/3093"
    },
    {
      number: 334,
      title: "Drag and Drop UI for binding Policy ",
      repo: "kubestellar/ui",
      organization: "Kubeflow",
      description: "Enhance the Binding Policy UI by introducing a drag-and-drop interface that enables users to visually create Binding Policies instead of manually writing YAML files.",
      status: "merged",
      date: "2025-03",
      labels: ["enhancement", "ml", "operators"],
      stats: { additions: 8465, deletions: 184, comments: 3, files: 34 },
      link: "https://github.com/kubestellar/ui/pull/334"
    },
    {
      number: 274,
      title: "Migrate from Context API to Zustand",
      repo: "kubestellar/ui",
      organization: "KubeStellar",
      status: "merged",
      date: "2025-03",
      labels: ["enhancement", "ui", "kubestellar", "zustand", "react-query"],
      stats: { additions: 181, deletions: 189, comments: 11, files: 32 },
      link: "https://github.com/kubestellar/ui/pull/274"
    },
    {
      number: 754,
      title: "Added Bulk edit Mode",
      repo: "kubestellar/ui",
      organization: "KubeStellar",
      status: "merged",
      date: "2025-04",
      labels: ["feature", "ui", "kubestellar"],
      stats: { additions: 100, deletions: 0, comments: 8, files: 1 },
      link: "https://github.com/kubestellar/ui/pull/754"
    },
    {
      number: 353,
      title: "Update backend API to support drag and drop",
      repo: "kubestellar/ui",
      organization: "KubeStellar",
      description: "Enhanced the backend API to support drag and drop functionality in the UI.",
      status: "merged",
      date: "2025-03",
      labels: ["enhancement", "backend", "golang", "api"],
      stats: { additions: 1051, deletions: 19, comments: 0, files: 2 },
      link: "https://github.com/kubestellar/ui/pull/353"
    }
  ];