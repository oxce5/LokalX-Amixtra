FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y curl sudo git xz-utils bash && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -m nixuser && \
    curl -L https://nixos.org/nix/install | bash -s -- --daemon

ENV USER=nixuser
ENV NIX_PATH=/nix/var/nix/profiles/per-user/root/channels
ENV PATH=/home/nixuser/.nix-profile/bin:/nix/var/nix/profiles/default/bin:$PATH

RUN echo "nixuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER nixuser
WORKDIR /home/nixuser

CMD ["/bin/bash"]
