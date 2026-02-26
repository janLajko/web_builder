export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    credits: number;
}

export interface WebsiteProject {
    id: string;
    name: string;
    description?: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    versions?: Version[];
}

export interface Version {
    id: string;
    projectId: string;
    code: string;
    prompt?: string;
    createdAt: string;
}

export interface Conversation {
    id: string;
    role: string;
    message: string;
    createdAt: string;
}

export interface Transaction {
    id: string;
    amount: number;
    creditsAdded: number;
    createdAt: string;
}
