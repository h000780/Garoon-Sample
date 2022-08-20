type Notifications = {
  items: NotificationItem[];
  hasNext: boolean;
}

type NotificationItem = {
  moduleId: string;
  creator: {
    id: number;
    code: string;
    name: string;
  };
  createdAt: string;
  operation: string;
  url: string;
  title: string;
  body: string;
  icon: string;
  isRead: boolean;
}

type NotificationRestRequestBody = {
  app: string;
  notificationKey: string;
  operation: "add" | "modify" | "remove";
  url: string;
  title: string;
  body: string;
  icon?: string;
  destinations: Distinations;
}

type Distinations = {
  type: string;
  id: number;
}[] | {
  type: string;
  code: string;
}[];