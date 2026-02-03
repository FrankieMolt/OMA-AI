import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar className="mr-1 h-3 w-3" /> {post.date}
            </span>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 mt-2">{post.excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="mr-2 h-3 w-3" /> {post.author}
            </div>
            <span className="text-primary text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
