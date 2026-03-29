import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';
import userRouter from './routes/userRoutes';
import projectRouter from './routes/projectRoutes';

// ---------------------------------------------------------------------------
// Startup: Validate required environment variables
// ---------------------------------------------------------------------------
const REQUIRED_ENV_VARS = [
    'DATABASE_URL',
    'DIRECT_URL',
    'BETTER_AUTH_SECRET',
    'BETTER_AUTH_URL',
] as const;

const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error('\n' + '='.repeat(60));
    console.error('❌  MISSING REQUIRED ENVIRONMENT VARIABLES');
    console.error('='.repeat(60));
    missing.forEach((key) => console.error(`   • ${key}`));
    console.error('\nTo fix this:');
    console.error('  1. Copy  server/.env.example  →  server/.env');
    console.error('  2. Fill in your own values (database URL, secrets, etc.)');
    console.error('  3. Run  npx prisma db push  to set up the database tables');
    console.error('  4. Restart the server with  npm run dev');
    console.error('='.repeat(60) + '\n');
    process.exit(1);
}

const missingOptional = [
    ...(process.env.OPENAI_API_KEY || process.env.AI_API_KEY ? [] : ['OPENAI_API_KEY (or AI_API_KEY)']),
];
if (missingOptional.length > 0) {
    console.warn('\n⚠️  Optional env vars not set (AI generation will not work):');
    missingOptional.forEach((key) => console.warn(`   • ${key}`));
    console.warn('   Copy values from server/.env.example\n');
}

const app = express();

const trustedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    ...(process.env.TRUSTED_ORIGINS?.split(',').map(o => o.replace(/['"]/g, '').trim()) || [])
];

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || trustedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({ message: 'DivStack AI Backend is running successfully!' });
});

app.all('/api/auth/*', toNodeHandler(auth));

app.use(express.json({ limit: '50mb' }));

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});
