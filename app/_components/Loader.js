function Loader() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-background ">
        <span className="text-4xl font-bold text-primary animate-pulse">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-200">.</span>
          <span className="animate-bounce delay-400">.</span>
        </span>
      </div>
    )
}

export default Loader
