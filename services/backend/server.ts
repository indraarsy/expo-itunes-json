import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

type Albums = {
  feed: {
    entry: Album[];
  };
};

type Album = {
  "im:name": {
    label: string;
  };
  "im:image": {
    label: string;
  }[];
  "im:artist": {
    label: string;
    attributes: {
      href: string;
    };
  };
  category: {
    attributes: {
      label: string;
    };
  };
  "im:releaseDate": {
    label: Date;
    attributes: {
      label: string;
    };
  };
};

export const appRouter = t.router({
  // userById: t.procedure
  //   // The input is unknown at this time.
  //   // A client could have sent us anything
  //   // so we won't assume a certain data type.
  //   .input((val: unknown) => {
  //     // If the value is of type string, return it.
  //     // TypeScript now knows that this value is a string.
  //     if (typeof val === 'string') return val;

  //     // Uh oh, looks like that input wasn't a string.
  //     // We will throw an error instead of running the procedure.
  //     throw new Error(`Invalid input: ${typeof val}`);
  //   })
  //   .query((req) => {
  //     const { input } = req;
  //     const user = userList.find((u) => u.id === input);

  //     return user;
  //   }),
  getAllAlbums: t.procedure.query(async () => {
    const url = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

    const data = await fetch(url)
      .then((response) => response.json())
      .then((data: Albums) => {
        return data.feed.entry;
      });

    return data;
  }),
});

export type AppRouter = typeof appRouter;
