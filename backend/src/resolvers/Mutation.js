const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

const { transport, makeANiceEmail } = require("../mail");
const { hasPermission } = require("../utils");
const stripe = require("../stripe");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          // this is how we create a relationship between the Item and the User
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return item;
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    // throw new Error('YOU AREN\'T ALLOWED')
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title user { id }}`);
    // 2. Check if they own that item, or have the permissions
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "ITEMDELETE"].includes(permission)
    );
    // error out if user doesn't have permission
    if (!ownsItem && !hasPermissions) {
      throw new Error("You don't have permission to do that");
    }
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async createMovie(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const movie = await ctx.db.mutation.createMovie(
      {
        data: {
          // this is how we create a relationship between the Item and the User
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return movie;
  },
  updateMovie(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateMovie(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteMovie(parent, args, ctx, info) {
    // throw new Error('YOU AREN\'T ALLOWED')
    const where = { id: args.id };
    // 1. find the item
    const movie = await ctx.db.query.movie(
      { where },
      `{ id title user { id }}`
    );
    // 2. Check if they own that item, or have the permissions
    const addedMovie = movie.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "ITEMDELETE"].includes(permission)
    );
    // error out if user doesn't have permission
    if (!addedMovie && !hasPermissions) {
      throw new Error("You don't have permission to do that");
    }
    // 3. Delete it!
    return ctx.db.mutation.deleteMovie({ where }, info);
  },
  async createBook(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const book = await ctx.db.mutation.createBook(
      {
        data: {
          // this is how we create a relationship between the Item and the User
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return book;
  },
  updateBook(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateBook(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteBook(parent, args, ctx, info) {
    // throw new Error('YOU AREN\'T ALLOWED')
    const where = { id: args.id };
    // 1. find the item
    const book = await ctx.db.query.book({ where }, `{ id title user { id }}`);
    // 2. Check if they own that item, or have the permissions
    const addedBook = book.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "ITEMDELETE"].includes(permission)
    );
    // error out if user doesn't have permission
    if (!addedBook && !hasPermissions) {
      throw new Error("You don't have permission to do that");
    }
    // 3. Delete it!
    return ctx.db.mutation.deleteBook({ where }, info);
  },
  async createGame(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const game = await ctx.db.mutation.createGame(
      {
        data: {
          // this is how we create a relationship between the Item and the User
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return game;
  },
  updateGame(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateGame(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteGame(parent, args, ctx, info) {
    // throw new Error('YOU AREN\'T ALLOWED')
    const where = { id: args.id };
    // 1. find the item
    const game = await ctx.db.query.game({ where }, `{ id title user { id }}`);
    // 2. Check if they own that item, or have the permissions
    const addedGame = game.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "ITEMDELETE"].includes(permission)
    );
    // error out if user doesn't have permission
    if (!addedGame && !hasPermissions) {
      throw new Error("You don't have permission to do that");
    }
    // 3. Delete it!
    return ctx.db.mutation.deleteGame({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. first check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }
    // 3. generate the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 5. return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    // delete cookie
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async requestReset(parent, args, ctx, info) {
    // 1. check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No sch user found for email ${args.email}`);
    }
    // 2. set a reset token and expiry on that user
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });

    // 3. email them that reset token
    const mailRes = await transport.sendMail({
      from: "peterjd42@gmail.com",
      to: user.email,
      subject: "Your password reset token",
      html: makeANiceEmail(`Your Password Reset Token is here! 
      \n\n 
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>`)
    });
    // 4. return the message
    return { message: "Thanks!" };
  },
  async resetPassword(parent, args, ctx, info) {
    // 1. check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Yo passwords don't match");
    }
    // 2. check if its a legit reset token
    // 3. check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error("this token is either invalid or expired");
    }
    // 4. hash their new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. save the new password to the user and remove old reset token fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // 6. generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

    // 7. set the JWT cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 8. return the new user
    return updatedUser;
  },
  async updatePermissions(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    // 2. Query the current user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );
    // 3. Check if they have permissions to do this
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
    // 4. Update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  },
  async addToCart(parent, args, ctx, info) {
    // 1. make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to add things");
    }
    // 2. query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id }
      }
    });
    // 3. check if that item is already in their cart and increment by 1 if it is
    if (existingCartItem) {
      console.log("this item is already in their cart");
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 }
        },
        info
      );
    }
    // 4. if its not, create a fresh CartItem
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          item: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromCart(parent, args, ctx, info) {
    // 1. find the cart item
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id
        }
      },
      `{ id, user { id }}`
    );
    // 1.5 make sure we found an item
    if (!cartItem) throw new Error("no cartitem found!");
    // 2. make sure they own that cart item
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error("Cheatin huhhh, not your item");
    }
    // 3. delete that cart item
    return ctx.db.mutation.deleteCartItem(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async addToToWatch(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to add things");
    }

    const [existingToWatchItem] = await ctx.db.query.toWatchItems({
      where: {
        user: { id: userId },
        movie: { id: args.id }
      }
    });

    if (existingToWatchItem) {
      console.log("this item is already in their list");
      return existingToWatchItem;
    }

    return ctx.db.mutation.createToWatchItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          movie: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromToWatch(parent, args, ctx, info) {
    const { userId } = ctx.request;

    const [existingToWatchItem] = await ctx.db.query.toWatchItems({
      where: {
        user: { id: userId },
        movie: { id: args.id }
      }
    });
    // 1.5 make sure we found an item
    if (!existingToWatchItem) throw new Error("no toWatchItem found!");
    // 2. TODO: make sure they own that movie item
    // if (existingToWatchItem.user !== userId) {
    //   throw new Error("Cheatin huhhh, not your item");
    // }

    return ctx.db.mutation.deleteToWatchItem(
      {
        where: {
          id: existingToWatchItem.id
        }
      },
      info
    );
  },
  async addToSeenIt(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to add things");
    }

    const [existingSeenItItem] = await ctx.db.query.seenItItems({
      where: {
        user: { id: userId },
        movie: { id: args.id }
      }
    });

    if (existingSeenItItem) {
      console.log("this item is already in their list");
      return existingSeenItItem;
    }

    return ctx.db.mutation.createSeenItItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          movie: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromSeenIt(parent, args, ctx, info) {
    const { userId } = ctx.request;

    const [existingSeenItItem] = await ctx.db.query.seenItItems({
      where: {
        user: { id: userId },
        movie: { id: args.id }
      }
    });

    if (!existingSeenItItem) throw new Error("no SeenItItem found!");
    // if (existingSeenItItem.user !== userId) {
    //   throw new Error("Cheatin huhhh, not your item");
    // }

    return ctx.db.mutation.deleteSeenItItem(
      {
        where: {
          id: existingSeenItItem.id
        }
      },
      info
    );
  },
  async addToToRead(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to add things");
    }

    const [existingToReadItem] = await ctx.db.query.toReadItems({
      where: {
        user: { id: userId },
        book: { id: args.id }
      }
    });

    if (existingToReadItem) {
      console.log("this item is already in their list");
      return existingToReadItem;
    }

    return ctx.db.mutation.createToReadItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          book: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromToRead(parent, args, ctx, info) {
    const { userId } = ctx.request;

    const [existingToReadItem] = await ctx.db.query.toReadItems({
      where: {
        user: { id: userId },
        book: { id: args.id }
      }
    });
    // 1.5 make sure we found an item
    if (!existingToReadItem) throw new Error("no toReadItem found!");
    // 2. TODO: make sure they own that movie item
    // if (existingToReadItem.user !== userId) {
    //   throw new Error("Cheatin huhhh, not your item");
    // }

    return ctx.db.mutation.deleteToReadItem(
      {
        where: {
          id: existingToReadItem.id
        }
      },
      info
    );
  },
  async addToReadIt(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to add things");
    }

    const [existingReadItItem] = await ctx.db.query.readItItems({
      where: {
        user: { id: userId },
        book: { id: args.id }
      }
    });

    if (existingReadItItem) {
      console.log("this item is already in their list");
      return existingReadItItem;
    }

    return ctx.db.mutation.createReadItItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          book: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromReadIt(parent, args, ctx, info) {
    const { userId } = ctx.request;

    const [existingReadItItem] = await ctx.db.query.readItItems({
      where: {
        user: { id: userId },
        book: { id: args.id }
      }
    });

    if (!existingReadItItem) throw new Error("no ReadItItem found!");
    // if (existingReadItItem.user !== userId) {
    //   throw new Error("Cheatin huhhh, not your item");
    // }

    return ctx.db.mutation.deleteReadItItem(
      {
        where: {
          id: existingReadItItem.id
        }
      },
      info
    );
  },
  async addToToPlay(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to add things");
    }

    const [existingToPlayItem] = await ctx.db.query.toPlayItems({
      where: {
        user: { id: userId },
        game: { id: args.id }
      }
    });

    if (existingToPlayItem) {
      console.log("this item is already in their list");
      return existingToPlayItem;
    }

    return ctx.db.mutation.createToPlayItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          game: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromToPlay(parent, args, ctx, info) {
    const { userId } = ctx.request;

    const [existingToPlayItem] = await ctx.db.query.toPlayItems({
      where: {
        user: { id: userId },
        game: { id: args.id }
      }
    });
    // 1.5 make sure we found an item
    if (!existingToPlayItem) throw new Error("no toPlayItem found!");
    // 2. TODO: make sure they own that movie item
    // if (existingToPlayItem.user !== userId) {
    //   throw new Error("Cheatin huhhh, not your item");
    // }

    return ctx.db.mutation.deleteToPlayItem(
      {
        where: {
          id: existingToPlayItem.id
        }
      },
      info
    );
  },
  async addToPlayedIt(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in to add things");
    }

    const [existingPlayedItItem] = await ctx.db.query.playedItItems({
      where: {
        user: { id: userId },
        game: { id: args.id }
      }
    });

    if (existingPlayedItItem) {
      console.log("this item is already in their list");
      return existingPlayedItItem;
    }

    return ctx.db.mutation.createPlayedItItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          game: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromPlayedIt(parent, args, ctx, info) {
    const { userId } = ctx.request;

    const [existingPlayedItItem] = await ctx.db.query.playedItItems({
      where: {
        user: { id: userId },
        game: { id: args.id }
      }
    });

    if (!existingPlayedItItem) throw new Error("no PlayedItItem found!");
    // if (existingPlayedItItem.user !== userId) {
    //   throw new Error("Cheatin huhhh, not your item");
    // }

    return ctx.db.mutation.deletePlayedItItem(
      {
        where: {
          id: existingPlayedItItem.id
        }
      },
      info
    );
  },
  async createOrder(parent, args, ctx, info) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId)
      throw new Error("You must be signed in to complete this order.");
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{
      id
      name
      email
      cart {
        id
        quantity
        item { title price id description image largeImage }
      }}`
    );
    // 2. recalculate the total for the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      0
    );
    console.log(`Going to charge for a total of ${amount}`);
    // 3. Create the stripe charge (turn token into $$$)
    const charge = await stripe.charges.create({
      amount,
      currency: "USD",
      source: args.token
    });
    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } }
      };
      delete orderItem.id;
      return orderItem;
    });

    // 5. create the Order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    });
    // 6. Clean up - clear the users cart, delete cartItems
    const cartItemIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemIds
      }
    });
    // 7. Return the Order to the client
    return order;
  }
};

module.exports = Mutations;
