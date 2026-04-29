export type ResumeProject = {
  id: string;
  title: string;
  dateRange: string;
  description: string;
  tags: string[];
};

type ProjectsResponse = {
  ok: boolean;
  projects: ResumeProject[];
};

export async function fetchProjectsFromApi(signal?: AbortSignal): Promise<ResumeProject[]> {
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    return [];
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/projects`, { signal });
  if (!response.ok) {
    throw new Error(`Projects API request failed: ${response.status}`);
  }

  const json = (await response.json()) as ProjectsResponse;
  if (!json.ok || !Array.isArray(json.projects)) {
    throw new Error('Projects API returned invalid response');
  }

  return json.projects;
}
