import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github } from 'lucide-react';
import strings from '@/constants/text.json';

export default function LoginPage() {
  return (
    <Card className="glass-enhanced border-border/60 shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{strings.auth.login.title}</CardTitle>
        <CardDescription className="text-center">
          {strings.auth.login.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" className="border-border/60 hover:bg-foreground/5">
            <Github className="mr-2 h-4 w-4" />
            {strings.auth.common.github}
          </Button>
          <Button variant="outline" className="border-border/60 hover:bg-foreground/5">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                className="fill-[#4285F4]"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                className="fill-[#34A853]"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                className="fill-[#FBBC05]"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                className="fill-[#EA4335]"
              />
            </svg>
            {strings.auth.common.google}
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">{strings.auth.common.or_continue}</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">{strings.auth.common.email_label}</Label>
          <Input id="email" type="email" placeholder={strings.auth.common.email_placeholder} className="glass-input" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{strings.auth.common.password_label}</Label>
          <Input id="password" type="password" className="glass-input" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full bg-primary hover:bg-primary/90">{strings.auth.login.button}</Button>
        <p className="text-xs text-center text-muted-foreground">
          {strings.auth.login.no_account}{' '}
          <Link href="/register" className="text-primary hover:underline">
            {strings.auth.login.sign_up}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
