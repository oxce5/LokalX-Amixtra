FROM ubuntu:latest

# Install base dependencies
RUN apt-get update && \
    apt-get install -y curl xz-utils sudo tmux git && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user (replace 'someUsername' with your preferred username if desired)
ARG USERNAME=someUsername
RUN useradd -m -s /bin/bash $USERNAME && \
    usermod -aG sudo $USERNAME && \
    echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

COPY . /home/$USERNAME/app

# Create /nix directory and set ownership
RUN mkdir /nix && chown -R $USERNAME /nix 

USER $USERNAME
ENV HOME=/home/$USERNAME
WORKDIR /home/$USERNAME/app

RUN sudo chown -R $USERNAME ~/app

# Install Nix in single-user mode (no-daemon)
RUN curl -L https://nixos.org/nix/install | sh -s -- --no-daemon
#
RUN ~/.nix-profile/bin/nix-env --install --attr devenv -f https://github.com/NixOS/nixpkgs/tarball/nixpkgs-unstable

CMD ["/bin/bash"]

ENTRYPOINT ["/bin/bash", "-c", "~/.nix-profile/bin/devenv shell"]
