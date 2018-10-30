import React from 'react';
import Carousel from './ImageCarousel'

export default function Home() {
  return (
    <div>
      <p>** Beta version **</p>
      <h1>PhaME</h1>
      <h3>Phylogenetic Analysis and Molecular Evolution</h3>
      <p>PhaME is a whole-genome SNP-based tool that calculates core genome and SNPs, parse them to coding or non-coding regions, identify synonymous and non-synonymous SNPs, reconstruct phylogeny, and perform molecular evolutionary analysis to identify genes under selection from finished genomes, contigs, and/or raw FASTQ reads. </p>
      <div className='image-carousel-container'>
        <Carousel/>
      </div>
    </div>
  )
}